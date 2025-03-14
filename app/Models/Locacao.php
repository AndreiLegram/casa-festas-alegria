<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Locacao extends Model
{
    use HasFactory;

    protected $fillable = [
        'codigo',
        'data',
        'id_contato',
        'valor_total',
        'data_devolucao'
    ];

    protected $dates = ['data', 'data_devolucao'];

    public function locacaoItems()
    {
        return $this->hasMany(LocacaoItem::class, 'id_locacao');
    }

    public function cliente()
    {
        return $this->belongsTo(Cliente::class, 'id_contato');
    }
}