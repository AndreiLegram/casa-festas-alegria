<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Brinquedo extends Model
{
    use HasFactory;

    // Defina os campos que podem ser preenchidos massivamente
    protected $fillable = [
        'codigo_unico',
        'nome',
        'tipo',
        'marca',
        'data_aquisicao',
        'valor_locacao',
    ];

    // Se você estiver usando outros tipos de campo como 'data', pode ser necessário ajustar a formatação de datas
    protected $dates = ['data_aquisicao'];

    // Caso você queira algum comportamento personalizado para a model, pode adicionar métodos extras aqui
}