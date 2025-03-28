<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Brinquedo;
use App\Models\TipoBrinquedo;
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

        return Inertia::render('brinquedos/brinquedosForm', [
            'brinquedo' => $brinquedo,
            'tipos' => $tipos
        ]);
    }

    public function show($id)
    {
        $brinquedo = Brinquedo::find($id); // Encontra o brinquedo pelo ID

        if (!$brinquedo) {
            return response()->json(['message' => 'Brinquedo não encontrado'], 404);
        }

        return response()->json($brinquedo); // Retorna o brinquedo encontrado
    }

    public function store(Request $request)
    {
        $content = $request->getContent();
        $data = json_decode($content, true); 
        if (!empty($data->codigo_unico)) {
            $produtos = DB::table('brinquedos')
                    ->select('id')
                    ->where('codigo', '=', $data->codigo_unico)
                    ->get();

            if (!empty($produtos)) {
                return Inertia::render('brinquedos/brinquedosForm', [
                    'errors' => 'Código já cadastrado', // Erros de validação
                    'brinquedo' => $request->all(),
                    'tipos' => $tipos   
                ]); 
            }
        }
        
        $validatedData = $request->validate([
            'nome' => 'required|string',
            'tipo' => 'required|string',
            'marca' => 'required|string',
            'data_aquisicao' => 'required|date',
            'valor_locacao' => 'required|numeric',
          ]);
          
        $brinquedo = Brinquedo::create($validatedData); // Cria um novo brinquedo no banco
        
        return Inertia::render('brinquedos/brinquedos', [
            'brinquedos' => $brinquedos
        ]);
    }

    public function update(Request $request, $id)
    {
        $brinquedo = Brinquedo::find($id); // Encontra o brinquedo pelo ID

        if (!$brinquedo) {
            return response()->json(['message' => 'Brinquedo não encontrado'], 404);
        }

        $validated = $request->validate([
            'nome' => 'sometimes|required|string|max:255',
            'descricao' => 'sometimes|required|string',
            'preco' => 'sometimes|required|numeric',
        ]);

        $brinquedo->update($validated); // Atualiza os dados do brinquedo
        return $this->index();
    }

    public function destroy($id)
    {
        $brinquedo = Brinquedo::find($id); // Encontra o brinquedo pelo ID

        if (!$brinquedo) {
            return response()->json(['message' => 'Brinquedo não encontrado'], 404);
        }

        $brinquedo->delete(); // Deleta o brinquedo
        return response()->json(['message' => 'Brinquedo deletado com sucesso']); // Retorna uma mensagem de sucesso
    }
}
