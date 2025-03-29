<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            ClienteSeeder::class,
            BrinquedoSeeder::class,
            TipoBrinquedoSeeder::class,
        ]);
    }
}
