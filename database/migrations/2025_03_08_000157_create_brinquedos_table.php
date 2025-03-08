<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('brinquedos', function (Blueprint $table) {
            $table->id(); // campo id padrão (chave primária)
            $table->string('codigo_unico')->unique(); // código único
            $table->string('nome'); // nome do brinquedo
            $table->string('tipo'); // tipo do brinquedo
            $table->string('marca'); // marca do brinquedo
            $table->date('data_aquisicao'); // data da aquisição
            $table->decimal('valor_locacao', 8, 2); // valor da locação
            $table->timestamps();
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('brinquedos');
    }
};
