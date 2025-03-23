<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class TipoBrinquedoSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        // Criar 10 tipos de brinquedos
        for ($i = 0; $i < 10; $i++) {
            DB::table('tipos_brinquedos')->insert([
                'codigo' => $faker->unique()->word(),
                'nome' => $faker->word(),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
