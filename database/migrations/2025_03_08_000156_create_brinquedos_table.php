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
            $table->id();
            $table->string('codigo_unico')->unique();
            $table->string('nome');
            $table->string('tipo');
            $table->string('marca');
            $table->date('data_aquisicao');
            $table->decimal('valor_locacao', 8, 2);
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
