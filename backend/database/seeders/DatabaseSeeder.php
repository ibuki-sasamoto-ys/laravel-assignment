<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(10)->create();

        User::firstOrCreate(
            ['email' => 'test@example.com'], // 検索条件
            [
                'first_name' => '太郎',
                'last_name' => 'テスト',
                'password' => bcrypt('password123'),
                'first_name_kana' => 'タロウ',
                'last_name_kana' => 'テスト',
                'phone' => '1234567890',
                'postal_code' => '123-4567',
                'prefecture' => 'Tokyo',
                'city' => 'Shibuya',
                'address' => '1-2-3 Shibuya',
                'building' => 'Shibuya Building',
                'email_verified_at' => now(),
            ]
        );
    }
}
