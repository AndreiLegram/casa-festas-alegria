<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Brinquedo;
use App\Models\TipoBrinquedo;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class BrinquedosController extends Controller
{
    public function index()
    {
        $brinquedos = Brinquedo::all();
        return Inertia::render('brinquedos/brinquedos', [
            'brinquedos' => $brinquedos
        ]);
    }

    public function form($id = null)
    {
        $tipos = TipoBrinquedo::all();
        $brinquedo = $id ? Brinquedo::find($id) : null;

        return Inertia::render('brinquedos/brinquedo', [
            'brinquedo' => $brinquedo,
            'tipos' => $tipos
        ]);
    }

    public function show($id)
    {
        $brinquedo = Brinquedo::find($id);

        if (!$brinquedo) {
            return response()->json(['message' => 'Brinquedo não encontrado'], 404);
        }

        return response()->json($brinquedo);
    }

    public function store(Request $request)
    {
        $content = $request->getContent();
        $data = json_decode($content, true); 
        if (!empty($data['codigo_unico'])) {
            $produtos = DB::table('brinquedos')
                ->select('id')
                ->where('codigo_unico', '=', $data['codigo_unico'])
                ->get();
    
            if ($produtos->isNotEmpty()) {
                return Inertia::render('brinquedos/brinquedo', [
                    'errors' => ['message' => 'Este código já foi registrado.'],
                    'brinquedo' => $request->all(),
                    'tipos' => TipoBrinquedo::all(),
                ]);
            }
        }
        
        
        $validatedData = $request->validate([
            'codigo_unico' => 'required|string',
            'nome' => 'required|string',
            'tipo' => 'required|string',
            'marca' => 'required|string',
            'data_aquisicao' => 'required|date',
            'valor_locacao' => 'required|numeric',
          ]);
        $brinquedo = Brinquedo::create($validatedData);
        return $this->index();
    }

    public function update(Request $request, $id)
    {
        $brinquedo = Brinquedo::find($id); // Encontra o brinquedo pelo ID

        if (!$brinquedo) {
            return Inertia::render('brinquedos/brinquedo', [
                'errors' => ['message' => 'Brinquedo não encontradoo.'],
                'brinquedo' => $request->all(),
                'tipos' => TipoBrinquedo::all(),
            ]);
        }
    
        $codigoUnico = $request->input('codigo_unico');
        $produtoExistente = Brinquedo::where('codigo_unico', $codigoUnico)
                                    ->where('id', '!=', $id)
                                    ->first();

    
        if ($produtoExistente) {
            return Inertia::render('brinquedos/brinquedo', [
                'errors' => ['message' => 'Este código já foi registrado.'],
                'brinquedo' => $request->all(),
                'tipos' => TipoBrinquedo::all(),
            ]);
        }

        $validated = $request->validate([
            'codigo_unico' => 'required|string',
            'nome' => 'sometimes|required|string|max:255',
            'descricao' => 'sometimes|required|string',
            'preco' => 'sometimes|required|numeric',
        ]);

        $brinquedo->update($validated);
        return $this->index();
    }


    public function destroy($id)
    {
        $brinquedo = Brinquedo::find($id);

        if (!$brinquedo) {
            return response()->json(['message' => 'Brinquedo não encontrado'], 404);
        }

        $brinquedo->delete();
        return response()->json(['message' => 'Brinquedo deletado com sucesso']);
    }
}
