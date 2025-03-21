<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cliente; 
use Inertia\Inertia;

class ClienteController extends Controller {

    public function index()
    {
        $clientes = Cliente::all();  
        return Inertia::render('Cliente', [
            'clientes' => $clientes
        ]);
    }

    public function show($id)
    {
        $cliente = Cliente::find($id);

        if (!$cliente) {
            return Inertia::render(['message' => 'cliente não encontrado'], 404);
        }

        return Inertia::render($cliente);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'cpf' => 'required|string|max:15',
            'nome' => 'required|string|max:255'
        ]);

        $cliente = Cliente::create($validated); 
        return Inertia::render($cliente, 201); 
    }

    public function update(Request $request, $id)
    {
        $cliente = Cliente::find($id);

        if (!$cliente) {
            return Inertia::render(['message' => 'cliente não encontrado'], 404);
        }

        $validated = $request->validate([
            'cpf' => 'required|string|max:15',
            'nome' => 'required|string|max:255'
        ]);

        $cliente->update($validated); 
        return Inertia::render($cliente); 
    }

    public function destroy($id)
    {
        $cliente = Cliente::find($id);

        if (!$cliente) {
            return Inertia::render(['message' => 'cliente não encontrado'], 404);
        }

        $cliente->delete();
        return Inertia::render(['message' => 'cliente deletado com sucesso']);
    }
}
