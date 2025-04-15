<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'Renato Portaluva',
            'email' => 'admin@gremio.com',
            'email_verified_at' => now(),
            'password' => Hash::make('gremio123'),
            'remember_token' => Str::random(10),
            'created_at' => now(),
            'updated_at' => now(),
            'permission_level' => 'gerente',
            'cpf' => '26857145024',
            'telefone' => '51984813601',
        ]);
    }
}
