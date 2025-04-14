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
        Schema::table('brinquedos', function (Blueprint $table) {
            $table->enum('situacao', ['disponivel', 'indisponivel'])->default('disponivel');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('brinquedos', function (Blueprint $table) {
            $table->dropColumn('situacao');
        });
    }
};
