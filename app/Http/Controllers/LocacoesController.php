<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Locacao; 

class LocacoesController extends Controller {

    public function index()
    {
        $locacoes = Locacao::all();  
        return response()->json($locacoes);  
    }

    public function show($id)
    {
        $locacao = Locacao::find($id);
        
        if (!$locacao) {
            return response()->json(['message' => 'Locação não encontrado'], 404);
        }
        
        return response()->json($locacao);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'codigo' => 'required|string|max:255',
            'data' => 'required|date',
            'id_contato' => 'required|exists:clientes,id',
            'valor_total' => 'required|numeric',
            'data_devolucao' => 'required|date',
            'itens_locacao' => 'array',
            'itens_locacao.*.id_brinquedo' => 'required|exists:brinquedos,id',
            'itens_locacao.*.quantidade' => 'required|integer|min:1',
            'itens_locacao.*.valor_unitario' => 'required|integer',
        ]);

        $locacao = Locacao::create([
            'codigo' => $validated['codigo'],
            'data' => $validated['data'],
            'id_contato' => $validated['id_contato'],
            'valor_total' => $validated['valor_total'],
            'data_devolucao' => $validated['data_devolucao'],
        ]);

        if (isset($validated['itens_locacao']) && count($validated['itens_locacao']) > 0) {
            foreach ($validated['itens_locacao'] as $item) {
                $locacao->locacaoItems()->create([
                    'id_brinquedo' => $item['id_brinquedo'],
                    'quantidade' => $item['quantidade'],
                    'valor_unitario' => $item['valor_unitario'],
                    'id_locacao' => $locacao->id,
                ]);
            }
        } else {
            return response()->json('Locação sem itens!', 400);
        }

        return response()->json($locacao->load('locacaoItems'), 201);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'codigo' => 'required|string|max:255',
            'data' => 'required|date',
            'id_contato' => 'required|exists:clientes,id',
            'valor_total' => 'required|numeric',
            'data_devolucao' => 'required|date',
            'itens_locacao' => 'array',
            'itens_locacao.*.id_brinquedo' => 'required|exists:brinquedos,id',
            'itens_locacao.*.quantidade' => 'required|integer|min:1',
            'itens_locacao.*.valor_unitario' => 'required|integer',
        ]);

        $locacao = Locacao::find($id);

        if (!$locacao) {
            return response()->json(['error' => 'Locação não encontrada'], 404);
        }

        $locacao->update([
            'codigo' => $validated['codigo'],
            'data' => $validated['data'],
            'id_contato' => $validated['id_contato'],
            'valor_total' => $validated['valor_total'],
            'data_devolucao' => $validated['data_devolucao'],
        ]);

        $locacao->locacaoItems()->delete();

        if (isset($validated['itens_locacao']) && count($validated['itens_locacao']) > 0) {
            foreach ($validated['itens_locacao'] as $item) {
                $locacao->locacaoItems()->create([
                    'id_brinquedo' => $item['id_brinquedo'],
                    'quantidade' => $item['quantidade'],
                    'valor_unitario' => $item['valor_unitario'],
                    'id_locacao' => $locacao->id,
                ]);
            }
        } else {
            return response()->json('Locação sem itens!', 400);
        }

        
        return response()->json($locacao->load('locacaoItems'), 200);
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
