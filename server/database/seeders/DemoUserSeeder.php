<?php

namespace Database\Seeders;

use App\Models\People;
use App\Models\Picture;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DemoUserSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Image URLs for demo user pictures
     *
     * @var array<string>
     */
    private array $imageUrls = [
        'https://res.cloudinary.com/dmbeqfkwt/image/upload/v1762866325/tinder-male-3_j99jq3.jpg',
        'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&h=1200&fit=crop',
        'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=1200&fit=crop',
    ];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::firstOrCreate(
            ['email' => 'demo@demo.app'],
            [
                'name' => 'Demo User',
                'password' => Hash::make('password'),
            ]
        );

        // Create or update people profile for demo user
        $people = People::firstOrCreate(
            ['user_id' => $user->id],
            [
                'name' => 'Demo User',
                'age' => 25,
                'location' => 'New York, NY',
                'gender' => 'M',
            ]
        );

        // Delete existing pictures
        $people->pictures()->delete();

        // Create exactly 3 pictures for demo user
        if (! empty($this->imageUrls[0])) {
            Picture::factory()->create([
                'people_id' => $people->id,
                'url' => $this->imageUrls[0],
                'order' => 0,
            ]);
        }

        if (! empty($this->imageUrls[1])) {
            Picture::factory()->create([
                'people_id' => $people->id,
                'url' => $this->imageUrls[1],
                'order' => 1,
            ]);
        }

        if (! empty($this->imageUrls[2])) {
            Picture::factory()->create([
                'people_id' => $people->id,
                'url' => $this->imageUrls[2],
                'order' => 2,
            ]);
        }
    }
}
