<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddPermissionLevelToUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('permission_level')->default('gerente'); // Adiciona a coluna 'permission_level' com valor default 'user'
            $table->string('cpf')->unique(); 
            $table->string('nome'); 
            $table->string('telefone');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('permission_level'); // Remove a coluna 'permission_level' caso a migration seja revertida
            $table->dropColumn('cpf'); 
            $table->dropColumn('nome'); 
            $table->dropColumn('telefone');
        });
    }
}