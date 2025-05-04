<?php

namespace App\Http\Controllers;

use App\Models\Brinquedo;
use App\Models\Cliente;
use Illuminate\Http\Request;
use App\Models\Locacao;
use Inertia\Inertia;

class LocacoesController extends Controller {

    public function index()
    {
        $locacoes = Locacao::all();  
        foreach ($locacoes as $locacao) {
            $cliente = Cliente::find($locacao->id_contato);
            if ($cliente) {
                $locacao->id_contato = $cliente->nome;
            }
        }
        return Inertia::render('locacao/locacoes', [
            'locacoes' => $locacoes
        ]);
    }

    public function form($id = null)
    {
        $locacao = $id ? Locacao::find($id) : null;

        if ($id && !$locacao) {
            return response()->json(['message' => 'Locação não encontrada'], 404);
        }

        if ($locacao) {
            $locacao->itens = $locacao->locacaoItems()->with('brinquedo')->get()->map(function ($item) {
                return [
                    'id_brinquedo' => $item->id_brinquedo,
                    'nome' => $item->brinquedo->nome ?? 'Brinquedo desconhecido'
                ];
            });
        }

        // Brinquedos disponíveis
        $brinquedosDisponiveis = Brinquedo::where('situacao', 'disponivel')->get();

        // Brinquedos já locados (mesmo que não estejam disponíveis)
        $brinquedosLocados = $locacao 
            ? Brinquedo::whereIn('id', $locacao->itens->pluck('id_brinquedo'))->get() 
            : collect();

        // Combina ambos e remove duplicados pelo ID
        $brinquedos = $brinquedosDisponiveis->merge($brinquedosLocados)->unique('id');

        $clientes = Cliente::all();

        return redirect()->route('locacoes');
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'data' => 'required|date',
            'data_devolucao' => 'required|date',
            'id_contato' => 'required|exists:clientes,id',
            'valor_total' => 'required|numeric',
            'data' => 'required|date',
            'data_devolucao' => 'required|date',
            'itens' => 'array',
            'itens.*.id_brinquedo' => 'required|exists:brinquedos,id',
        ]);
        
        $locacao = Locacao::create([
            'data' => $validated['data'],
            'id_contato' => $validated['id_contato'],
            'valor_total' => $validated['valor_total'],
            'data_devolucao' => $validated['data_devolucao'],
        ]);

        if (isset($validated['itens']) && count($validated['itens']) > 0) {
            foreach ($validated['itens'] as $item) {
                $brinquedo = Brinquedo::find($item['id_brinquedo']);
                if (!$brinquedo) {
                    return response()->json(['error' => 'Brinquedo não encontrado'], 404);
                }
                $locacao->locacaoItems()->create([
                    'id_brinquedo' => $item['id_brinquedo'],
                    'quantidade' => 1,
                    'valor_unitario' => $brinquedo->valor_locacao,
                    'id_locacao' => $locacao->id,
                ]);
                
                Brinquedo::where('id', $item['id_brinquedo'])
                    ->update(['situacao' => 'indisponivel']);
            }
        } else {
            return response()->json('Locação sem itens!', 400);
        }

        return redirect()->route('locacoes');
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'data' => 'required|date',
            'data_devolucao' => 'required|date',
            'id_contato' => 'required|exists:clientes,id',
            'valor_total' => 'required|numeric',
            'data' => 'required|date',
            'data_devolucao' => 'required|date',
            'itens' => 'array',
            'itens.*.id_brinquedo' => 'required|exists:brinquedos,id',
            'itens.*.valor_unitario' => 'required|numeric',
            'itens.*.quantidade' => 'required|integer|min:1',
        ]);

        $locacao = Locacao::find($id);

        if (!$locacao) {
            return response()->json(['error' => 'Locação não encontrada'], 404);
        }

        $locacao->update([
            'data' => $validated['data'],
            'id_contato' => $validated['id_contato'],
            'valor_total' => $validated['valor_total'],
            'data_devolucao' => $validated['data_devolucao'],
        ]);

        $locacao->locacaoItems()->delete();

        if (isset($validated['itens']) && count($validated['itens']) > 0) {
            foreach ($validated['itens'] as $item) {
                $locacao->locacaoItems()->create([
                    'id_brinquedo' => $item['id_brinquedo'],
                    'id_locacao' => $locacao->id,
                    'valor_unitario' => $item['valor_unitario'],
                    'quantidade' => $item['quantidade']
                ]);
            }
        } else {
            return response()->json('Locação sem itens!', 400);
        }

        
        return redirect()->route('locacoes');
    }

    public function pagamento(Request $request, $id)
    {
        $validated = $request->validate([
            'valor_total' => 'required|numeric',
            'data_pagamento' => 'required|date'
        ]);

        $locacao = Locacao::find($id);

        if (!$locacao) {
            return response()->json(['error' => 'Locação não encontrada'], 404);
        }

        $locacao->update([
            'data_pagamento' => $validated['data_pagamento']
        ]);

        return response()->json('Locação paga com sucesso!', 200);
    }


    public function destroy($id)
    {
        $locacao = Locacao::find($id);

        if (!$locacao) {
            return response()->json(['message' => 'Locacao não encontrado'], 404);
        }

        $locacao->delete();
        return response()->json(['message' => 'Locacao deletado com sucesso']);
    }
}
