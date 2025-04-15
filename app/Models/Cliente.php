<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasFactory;

    // Defina os campos que podem ser preenchidos massivamente
    protected $fillable = [
        'cpf',
        'nome',
        'endereco',
        'data_nascimento',
        'telefone'
    ];

    protected $dates = ['data_nascimento'];

}