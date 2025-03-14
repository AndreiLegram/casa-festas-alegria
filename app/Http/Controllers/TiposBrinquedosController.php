<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Funcionario; 

class TiposBrinquedosController extends Controller {
    
    public function index()
    {
        $tiposBrinquedos = TipoBrinquedo::all();  
        return response()->json($tiposBrinquedos);  
    }

    public function show($id)
    {
        $tiposBrinquedos = TipoBrinquedo::find($id);

        if (!$tiposBrinquedos) {
            return response()->json(['message' => 'TipoBrinquedo não encontrado'], 404);
        }

        return response()->json($tiposBrinquedos);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'codigo' => 'required|string|max:255',
        ]);

        $tipoBrinquedo = TipoBrinquedo::create($validated); 
        return response()->json($tipoBrinquedo, 201); 
    }

    public function update(Request $request, $id)
    {
        $tipoBrinquedo = TipoBrinquedo::find($id);

        if (!$tipoBrinquedo) {
            return response()->json(['message' => 'TipoBrinquedo não encontrado'], 404);
        }

        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'codigo' => 'required|string|max:255'
        ]);

        $tipoBrinquedo->update($validated); 
        return response()->json($tipoBrinquedo); 
    }

    public function destroy($id)
    {
        $tipoBrinquedo = TipoBrinquedo::find($id);

        if (!$tipoBrinquedo) {
            return response()->json(['message' => 'TipoBrinquedo não encontrado'], 404);
        }

        $tipoBrinquedo->delete();
        return response()->json(['message' => 'TipoBrinquedo deletado com sucesso']);
    }
}
