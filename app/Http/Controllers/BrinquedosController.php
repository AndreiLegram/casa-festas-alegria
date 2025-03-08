<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Brinquedo; // Supondo que você tenha um modelo Brinquedo

class BrinquedosController extends Controller
{
    // Método para listar todos os brinquedos
    public function index()
    {
        $brinquedos = Brinquedo::all();  // Retorna todos os brinquedos no banco de dados
        return response()->json($brinquedos);  // Retorna os brinquedos em formato JSON
    }

    // Método para mostrar um brinquedo específico
    public function show($id)
    {
        $brinquedo = Brinquedo::find($id); // Encontra o brinquedo pelo ID

        if (!$brinquedo) {
            return response()->json(['message' => 'Brinquedo não encontrado'], 404);
        }

        return response()->json($brinquedo); // Retorna o brinquedo encontrado
    }

    // Método para criar um novo brinquedo
    public function store(Request $request)
    {
        // Validação dos dados recebidos via request
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'descricao' => 'required|string',
            'preco' => 'required|numeric',
        ]);

        $brinquedo = Brinquedo::create($validated); // Cria um novo brinquedo no banco
        return response()->json($brinquedo, 201); // Retorna o brinquedo criado com status 201
    }

    // Método para atualizar um brinquedo existente
    public function update(Request $request, $id)
    {
        $brinquedo = Brinquedo::find($id); // Encontra o brinquedo pelo ID

        if (!$brinquedo) {
            return response()->json(['message' => 'Brinquedo não encontrado'], 404);
        }

        // Validação dos dados recebidos via request
        $validated = $request->validate([
            'nome' => 'sometimes|required|string|max:255',
            'descricao' => 'sometimes|required|string',
            'preco' => 'sometimes|required|numeric',
        ]);

        $brinquedo->update($validated); // Atualiza os dados do brinquedo
        return response()->json($brinquedo); // Retorna o brinquedo atualizado
    }

    // Método para deletar um brinquedo
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
