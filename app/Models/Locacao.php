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
    protected $table = 'locacoes';

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($locacao) {
            do {
                $codigo = mt_rand(100000, 999999); // 6 dígitos
            } while (self::where('codigo', $codigo)->exists());

            $locacao->codigo = $codigo;
        });
    }

    public function locacaoItems()
    {
        return $this->hasMany(LocacaoItem::class, 'id_locacao');
    }

    public function cliente()
    {
        return $this->belongsTo(Cliente::class, 'id_contato');
    }
}