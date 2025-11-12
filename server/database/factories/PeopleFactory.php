<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\People>
 */
class PeopleFactory extends Factory
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
            'name' => fake()->name(),
            'age' => fake()->numberBetween(18, 65),
            'location' => fake()->city().', '.fake()->state(),
            'gender' => fake()->randomElement(['M', 'F']),
        ];
    }

    /**
     * Configure the factory to create pictures after creating a person.
     */
    public function configure(): static
    {
        return parent::configure()->afterCreating(function ($people) {
            \App\Models\Picture::factory()
                ->count(fake()->numberBetween(1, 5))
                ->create([
                    'people_id' => $people->id,
                ])
                ->each(function ($picture, $index) {
                    $picture->update(['order' => $index]);
                });
        });
    }

    public function male(): static
    {
        return $this->state(fn (array $attributes) => [
            'gender' => 'M',
        ]);
    }

    public function female(): static
    {
        return $this->state(fn (array $attributes) => [
            'gender' => 'F',
        ]);
    }
}
