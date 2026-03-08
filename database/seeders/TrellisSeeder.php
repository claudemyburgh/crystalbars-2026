<?php

namespace Database\Seeders;

use App\Models\Trellis;
use Illuminate\Database\Seeder;

class TrellisSeeder extends Seeder
{
    public function run(): void
    {
        $trellisItems = [
            ['width' => '900mm', 'drop' => '2100mm', 'price' => 'R 3,800'],
            ['width' => '1200mm', 'drop' => '2100mm', 'price' => 'R 4,800'],
            ['width' => '1500mm', 'drop' => '2100mm', 'price' => 'R 5,400'],
            ['width' => '1800mm', 'drop' => '2100mm', 'price' => 'R 5,900'],
            ['width' => '2200mm', 'drop' => '2100mm', 'price' => 'R 6,700'],
            ['width' => '2500mm', 'drop' => '2100mm', 'price' => 'R 7,560'],
            ['width' => '2700mm', 'drop' => '2100mm', 'price' => 'R 8,400'],
            ['width' => '3000mm', 'drop' => '2100mm', 'price' => 'R 9,400'],
        ];

        foreach ($trellisItems as $item) {
            Trellis::create($item);
        }
    }
}
