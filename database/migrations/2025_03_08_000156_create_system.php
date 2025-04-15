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
            $table->enum('situacao', ['disponivel', 'indisponivel'])->default('disponivel');
            $table->date('data_aquisicao');
            $table->decimal('valor_locacao', 8, 2);
            $table->timestamps();
        });
        Schema::create('clientes', function (Blueprint $table) {
            $table->id(); 
            $table->string('cpf')->unique(); 
            $table->string('nome'); 
            $table->string('endereco');
            $table->date('data_nascimento');
            $table->string('telefone');
            $table->timestamps();
        });
        Schema::create('tipos_brinquedos', function (Blueprint $table) {
            $table->id(); 
            $table->string('codigo')->unique(); 
            $table->string('nome');
            $table->timestamps();
        });
        Schema::create('locacoes', function (Blueprint $table) {
            $table->id(); 
            $table->integer('codigo')->unique(); 
            $table->date('data');
            $table->integer('id_contato'); 
            $table->decimal('valor_total', 8, 2);
            $table->date('data_devolucao');
            $table->date('data_pagamento')->nullable();
            $table->timestamps();
        });
        Schema::create('locacoes_item', function (Blueprint $table) {
            $table->id(); 
            $table->integer('id_locacao'); 
            $table->integer('id_brinquedo');
            $table->decimal('valor_unitario', 8, 2); 
            $table->integer('quantidade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('brinquedos');
        Schema::dropIfExists('clientes');
        Schema::dropIfExists('tipos_brinquedos');
        Schema::dropIfExists('locacoes');
        Schema::dropIfExists('locacoes_item');
    }
};
