<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class ClienteSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        // Função para gerar CPF válido
        function generateCPF() {
            $cpf = '';
            for ($i = 0; $i < 9; $i++) {
                $cpf .= rand(0, 9);
            }
            $cpf .= calculateCPFCheckDigits(substr($cpf, 0, 9));
            return $cpf;
        }

        function calculateCPFCheckDigits($cpf)
        {
            $sum1 = 0;
            $sum2 = 0;

            for ($i = 0; $i < 9; $i++) {
                $sum1 += $cpf[$i] * (10 - $i);
                $sum2 += $cpf[$i] * (11 - $i);
            }

            $digit1 = ($sum1 % 11) < 2 ? 0 : 11 - ($sum1 % 11);
            $digit2 = ($sum2 % 11) < 2 ? 0 : 11 - ($sum2 % 11);

            return $digit1 . $digit2;
        }

        // Criar 10 clientes
        for ($i = 0; $i < 10; $i++) {
            DB::table('clientes')->insert([
                'cpf' => generateCPF(),  // Gerar CPF válido
                'nome' => $faker->name(),
                'endereco' => $faker->address(),
                'data_nascimento' => $faker->date(),
                'telefone' => $faker->phoneNumber(),
            ]);
        }
    }
}
