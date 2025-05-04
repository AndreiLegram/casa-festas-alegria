<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User; 
use Inertia\Inertia;

class FuncionariosController extends Controller {

    public function index()
    {
        $funcionarios = User::all();  
        return Inertia::render('funcionarios/funcionarios', [
            'funcionarios' => $funcionarios
        ]);
    }

    public function form($id = null)
    {
        $funcionario = $id ? User::find($id) : null;
        return Inertia::render('funcionarios/funcionario', [
            'funcionario' => $funcionario
        ]);
    }

    public function show($id)
    {
        $funcionario = User::find($id);

        if (!$funcionario) {
            return Inertia::render('funcionarios/funcionario', [
                'errors' => ['message' => 'Funcionario não encontrado'],
                'funcionario' => null
            ]);
        }

        return response()->json($funcionario);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'telefone' => 'string|max:50',
            'name' => 'required|string|max:255',
            'password' => 'required|string|min:8',
            'email' => 'required|string|max:255',
            'cpf' => 'required|string|max:15',
            'permission_level' => 'required|string',
        ]);
        
        try {
            $funcionario = User::create($validated);
            return redirect()->route('funcionarios');
        } catch (\Exception $e) {
            return Inertia::render('funcionarios/funcionario', [
                'errors' => ['message' => 'Erro ao criar funcionario: ' . $e->getMessage()],
                'funcionario' => $validated
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        $funcionario = User::find($id);

        if (!$funcionario) {
            return Inertia::render('funcionarios/funcionario', [
                'errors' => ['message' => 'Funcionario não encontrado'],
                'funcionario' => $request->all()
            ]);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'telefone' => 'string|max:50',
            'password' => 'required|string|min:8',
            'email' => 'required|string|max:255',
            'cpf' => 'required|string|max:15',
            'permission_level' => 'required|string',
        ]);

        try {
            $funcionario->update($validated); 
            return redirect()->route('funcionarios');
        } catch (\Exception $e) {
            return Inertia::render('funcionarios/funcionario', [
                'errors' => ['message' => 'Erro ao atualizar funcionario: ' . $e->getMessage()],
                'funcionario' => $validated
            ]);
        }
    }

    public function destroy($id)
    {
        $funcionario = User::find($id);

        if (!$funcionario) {
            return Inertia::render('funcionarios/funcionario', [
                'errors' => ['message' => 'Funcionario não encontrado'],
                'funcionario' => null
            ]);
        }

        try {
            $funcionario->delete();
            return response()->json(['message' => 'Funcionario deletado com sucesso']);
        } catch (\Exception $e) {
            return Inertia::render('funcionarios/funcionario', [
                'errors' => ['message' => 'Erro ao deletar funcionario: ' . $e->getMessage()],
                'funcionario' => null
            ]);
        }
    }
}
