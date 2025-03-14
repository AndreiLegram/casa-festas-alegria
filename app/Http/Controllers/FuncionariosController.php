<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Funcionario; 

class FuncionariosController extends Controller {

    public function index()
    {
        $funcionarios = Funcionario::all();  
        return response()->json($funcionarios);  
    }

    public function show($id)
    {
        $funcionario = Funcionario::find($id);

        if (!$funcionario) {
            return response()->json(['message' => 'Funcionario não encontrado'], 404);
        }

        return response()->json($funcionario);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'cpf' => 'required|string|max:15',
            'funcao' => 'required|string',
        ]);

        $funcionario = Funcionario::create($validated); 
        return response()->json($funcionario, 201); 
    }

    public function update(Request $request, $id)
    {
        $funcionario = Funcionario::find($id);

        if (!$funcionario) {
            return response()->json(['message' => 'Funcionario não encontrado'], 404);
        }

        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'cpf' => 'required|string|max:15',
            'funcao' => 'required|string',
        ]);

        $funcionario->update($validated); 
        return response()->json($brinquedo); 
    }

    public function destroy($id)
    {
        $funcionario = Funcionario::find($id);

        if (!$funcionario) {
            return response()->json(['message' => 'Funcionario não encontrado'], 404);
        }

        $funcionario->delete();
        return response()->json(['message' => 'Funcionario deletado com sucesso']);
    }
}
