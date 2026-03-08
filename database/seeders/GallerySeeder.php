<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class GallerySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $groups = [
            ['name' => 'Crystal Bars', 'slug' => 'crystal-bars'],
            ['name' => 'Trellis Gates', 'slug' => 'trellis-gates'],
        ];

        foreach ($groups as $group) {
            \App\Models\GalleryGroup::firstOrCreate(
                ['slug' => $group['slug']],
                ['name' => $group['name']],
            );
        }
    }
}
