<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class BrinquedoSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        // Criar 10 brinquedos
        for ($i = 0; $i < 10; $i++) {
            DB::table('brinquedos')->insert([
                'codigo_unico' => $faker->unique()->word(),
                'nome' => $faker->word(),
                'tipo' => $faker->word(),
                'marca' => $faker->company(),
                'data_aquisicao' => $faker->date(),
                'valor_locacao' => $faker->randomFloat(2, 10, 100),
            ]);
        }
    }
}
