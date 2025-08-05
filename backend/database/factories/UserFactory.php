<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'last_name' => fake()->lastName(),
            'first_name' => fake()->firstName(),
            'last_name_kana' => $this->toKatakana(fake()->lastName()),
            'first_name_kana' => $this->toKatakana(fake()->firstName()),
            'phone' => fake()->phoneNumber(),
            'postal_code' => fake()->postcode(),
            'prefecture' => fake()->city(),
            'city' => fake()->city(),
            'address' => fake()->streetAddress(),
            'building' => fake()->optional()->word(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }

    /**
     * 文字列をカタカナに変換
     */
    private function toKatakana(string $value): string
    {
        return mb_convert_kana($value, 'KVC'); // 半角→全角カタカナ＋濁点
    }
}
