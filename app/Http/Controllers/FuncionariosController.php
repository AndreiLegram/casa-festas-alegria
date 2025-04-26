<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Funcionario; 
use App\Models\User; 
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

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
            return response()->json(['message' => 'Funcionario não encontrado'], 404);
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

        $funcionario = User::create($validated); 
        return redirect()->route('funcionarios');
    }

    public function update(Request $request, $id)
    {
        $funcionario = User::find($id);

        if (!$funcionario) {
            return Inertia::render('funcionarios/funcionario', [
                'errors' => ['message' => 'Funcionario não encontradoo.'],
                'funcionarios' => $request->all()
            ]);
            return response()->json(['message' => 'Funcionario não encontrado'], 404);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'telefone' => 'string|max:50',
            'password' => 'required|string|min:8',
            'email' => 'required|string|max:255',
            'cpf' => 'required|string|max:15',
            'permission_level' => 'required|string',
        ]);

        $funcionario->update($validated); 
        return redirect()->route('funcionarios');
    }

    public function destroy($id)
    {
        $funcionario = User::find($id);

        if (!$funcionario) {
            return response()->json(['message' => 'Funcionario não encontrado'], 404);
        }

        $funcionario->delete();
        return response()->json(['message' => 'Funcionario deletado com sucesso']);
    }
}
