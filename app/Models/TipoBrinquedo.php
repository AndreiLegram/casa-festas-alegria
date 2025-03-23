<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoBrinquedo extends Model
{
    use HasFactory;

    // Defina os campos que podem ser preenchidos massivamente
    protected $fillable = [
        'codigo',
        'nome'
    ];
    
    protected $table = 'tipos_brinquedos';

    // Caso você queira algum comportamento personalizado para a model, pode adicionar métodos extras aqui
}