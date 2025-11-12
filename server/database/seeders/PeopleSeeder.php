<?php

namespace Database\Seeders;

use App\Models\People;
use App\Models\Picture;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PeopleSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Image URLs array - placeholder for now, will be updated later
     *
     * @var array<string>
     */
    private array $imageUrls = [
        'https://res.cloudinary.com/dmbeqfkwt/image/upload/v1762866325/tinder-male-3_j99jq3.jpg',
        'https://res.cloudinary.com/dmbeqfkwt/image/upload/v1762866326/tinder-male-4_fbr48r.jpg',
        'https://res.cloudinary.com/dmbeqfkwt/image/upload/v1762866326/tinder-male-5_lfuwh8.jpg',
        'https://res.cloudinary.com/dmbeqfkwt/image/upload/v1762866324/tinder-male-2_dd9sjf.jpg',
        'https://res.cloudinary.com/dmbeqfkwt/image/upload/v1762866325/tinder-male-1_uhnczv.jpg',
        'https://res.cloudinary.com/dmbeqfkwt/image/upload/v1762866326/tinder-female-5_cqo2i4.jpg',
        'https://res.cloudinary.com/dmbeqfkwt/image/upload/v1762866324/tinder-female-2_nbr530.jpg',
        'https://res.cloudinary.com/dmbeqfkwt/image/upload/v1762866324/tinder-female-3_jypjor.jpg',
        'https://res.cloudinary.com/dmbeqfkwt/image/upload/v1762866326/tinder-female-1_gl1vwb.jpg',
        'https://res.cloudinary.com/dmbeqfkwt/image/upload/v1762866324/tinder-female-4_vhpmlh.jpg',
    ];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create 50 male users with people profiles
        $maleUsers = User::factory(50)->create();

        foreach ($maleUsers as $index => $user) {
            $people = People::factory()->male()->create([
                'user_id' => $user->id,
            ]);

            // Delete any pictures created by factory
            $people->pictures()->delete();

            // Create exactly 3 pictures for each person
            // Cycle through male images (indices 0-4)
            Picture::factory()->create([
                'people_id' => $people->id,
                'url' => $this->imageUrls[$index % 5],
                'order' => 0,
            ]);

            Picture::factory()->create([
                'people_id' => $people->id,
                'url' => 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&h=1200&fit=crop',
                'order' => 1,
            ]);

            Picture::factory()->create([
                'people_id' => $people->id,
                'url' => 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=1200&fit=crop',
                'order' => 2,
            ]);
        }

        // Create 50 female users with people profiles
        $femaleUsers = User::factory(50)->create();

        foreach ($femaleUsers as $index => $user) {
            $people = People::factory()->female()->create([
                'user_id' => $user->id,
            ]);

            // Delete any pictures created by factory
            $people->pictures()->delete();

            // Create exactly 3 pictures for each person
            // Cycle through female images (indices 5-9)
            Picture::factory()->create([
                'people_id' => $people->id,
                'url' => $this->imageUrls[5 + ($index % 5)],
                'order' => 0,
            ]);

            Picture::factory()->create([
                'people_id' => $people->id,
                'url' => 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&h=1200&fit=crop',
                'order' => 1,
            ]);

            Picture::factory()->create([
                'people_id' => $people->id,
                'url' => 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=1200&fit=crop',
                'order' => 2,
            ]);
        }
    }
}
