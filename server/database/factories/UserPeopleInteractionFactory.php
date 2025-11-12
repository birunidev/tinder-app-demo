<?php

namespace Database\Factories;

use App\Models\People;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserPeopleInteraction>
 */
class UserPeopleInteractionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'people_id' => People::factory(),
            'action' => fake()->randomElement(['like', 'dislike']),
        ];
    }
}
