<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LocacaoItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_locacao',
        'id_brinquedo',
        'valor_unitario',
        'quantidade'
    ];

    protected $table = 'locacoes_item';

    public function locacao()
    {
        return $this->belongsTo(Locacao::class, 'id_locacao');
    }

    public function brinquedo()
    {
        return $this->belongsTo(Brinquedo::class, 'id_brinquedo');
    }
}