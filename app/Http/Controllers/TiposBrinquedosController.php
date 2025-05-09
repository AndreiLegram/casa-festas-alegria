<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TipoBrinquedo; 
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;

class TiposBrinquedosController extends Controller {
    
    public function index()
    {
        $tiposBrinquedos = TipoBrinquedo::all();  
        return Inertia::render('tiposBrinquedos/tiposBrinquedos', [
            'tiposBrinquedos' => $tiposBrinquedos
        ]);  
    }

    public function form($id = null)
    {
        $tipoBrinquedo = $id ? TipoBrinquedo::find($id) : null;

        return Inertia::render('tiposBrinquedos/tipoBrinquedo', [
            'tipoBrinquedo' => $tipoBrinquedo
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'codigo' => 'required|string|max:255',
        ]);

        $tipoBrinquedo = TipoBrinquedo::create($validated); 
        return redirect()->route('tiposBrinquedos'); 
    }

    public function update(Request $request, $id)
    {
        $tipoBrinquedo = TipoBrinquedo::find($id);

        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'codigo' => 'required|string|max:255'
        ]);

        $tipoBrinquedo->update($validated); 
        return redirect()->route('tiposBrinquedos');
    }

    public function destroy($id)
    {
        $tipoBrinquedo = TipoBrinquedo::find($id);

        if (!$tipoBrinquedo) {
            return response()->json(['message' => 'Tipo de Brinquedo não encontrado'], 404); 
        }

        $tipoBrinquedo->delete();
        return response()->json(['message' => 'Tipo de Brinquedo deletado com sucesso'], 200);  
    }
}
