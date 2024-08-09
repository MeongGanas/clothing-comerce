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
        // User::factory(10)->create();

        User::factory()->create([
            'first_name' => 'Admin',
            'phone' => '0895384961429',
            'role' => 'admin',
            'email' => 'farreluken@gmail.com',
            'password' => '1234'
        ]);
    }
}
