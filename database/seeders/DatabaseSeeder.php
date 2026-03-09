<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        foreach (config('users') as $user) {
            User::create($user);
        }

        $this->call([
            FaqSeeder::class,
            GallerySeeder::class,
            TrellisSeeder::class,
        ]);
    }
}
