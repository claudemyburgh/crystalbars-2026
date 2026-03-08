<?php

namespace Database\Seeders;

use App\Models\Trellis;
use Illuminate\Database\Seeder;

class TrellisSeeder extends Seeder
{
    public function run(): void
    {
        $trellisItems = [
            ['width' => '900', 'drop' => '2100', 'price' => '3800'],
            ['width' => '1200', 'drop' => '2100', 'price' => '4800'],
            ['width' => '1500', 'drop' => '2100', 'price' => '5400'],
            ['width' => '1800', 'drop' => '2100', 'price' => '5900'],
            ['width' => '2200', 'drop' => '2100', 'price' => '6700'],
            ['width' => '2500', 'drop' => '2100', 'price' => '7560'],
            ['width' => '2700', 'drop' => '2100', 'price' => '8400'],
            ['width' => '3000', 'drop' => '2100', 'price' => '9400'],
        ];

        foreach ($trellisItems as $item) {
            Trellis::create($item);
        }
    }
}
