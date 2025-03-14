<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cliente; 

class ClienteController extends Controller {

    public function index()
    {
        $clientes = Cliente::all();  
        return response()->json($clientes);  
    }

    public function show($id)
    {
        $cliente = Cliente::find($id);

        if (!$cliente) {
            return response()->json(['message' => 'cliente não encontrado'], 404);
        }

        return response()->json($cliente);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'cpf' => 'required|string|max:15',
            'nome' => 'required|string|max:255'
        ]);

        $cliente = Cliente::create($validated); 
        return response()->json($cliente, 201); 
    }

    public function update(Request $request, $id)
    {
        $cliente = Cliente::find($id);

        if (!$cliente) {
            return response()->json(['message' => 'cliente não encontrado'], 404);
        }

        $validated = $request->validate([
            'cpf' => 'required|string|max:15',
            'nome' => 'required|string|max:255'
        ]);

        $cliente->update($validated); 
        return response()->json($cliente); 
    }

    public function destroy($id)
    {
        $cliente = Cliente::find($id);

        if (!$cliente) {
            return response()->json(['message' => 'cliente não encontrado'], 404);
        }

        $cliente->delete();
        return response()->json(['message' => 'cliente deletado com sucesso']);
    }
}
