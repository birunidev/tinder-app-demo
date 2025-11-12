<?php

use App\Mail\PopularPersonAlert;
use App\Models\People;
use App\Models\User;
use App\Models\UserPeopleInteraction;
use Illuminate\Support\Facades\Mail;

test('sends email to admin when person has more than 50 likes', function () {
    Mail::fake();

    $person = People::factory()->create();
    $adminEmail = config('mail.from.address', 'admin@example.com');

    // Create 51 users who liked this person
    $users = User::factory()->count(51)->create();
    foreach ($users as $user) {
        UserPeopleInteraction::factory()->create([
            'user_id' => $user->id,
            'people_id' => $person->id,
            'action' => 'like',
        ]);
    }

    $this->artisan('people:check-popular')
        ->assertSuccessful();

    Mail::assertSent(PopularPersonAlert::class, function ($mail) use ($person, $adminEmail) {
        return $mail->hasTo($adminEmail) &&
            $mail->person->id === $person->id &&
            $mail->likesCount === 51;
    });
});

test('sends email to admin when person has exactly 50 likes', function () {
    Mail::fake();

    $person = People::factory()->create();
    $adminEmail = config('mail.from.address', 'admin@example.com');

    // Create 50 users who liked this person
    $users = User::factory()->count(50)->create();
    foreach ($users as $user) {
        UserPeopleInteraction::factory()->create([
            'user_id' => $user->id,
            'people_id' => $person->id,
            'action' => 'like',
        ]);
    }

    $this->artisan('people:check-popular')
        ->assertSuccessful();

    Mail::assertSent(PopularPersonAlert::class, function ($mail) use ($person, $adminEmail) {
        return $mail->hasTo($adminEmail) &&
            $mail->person->id === $person->id &&
            $mail->likesCount === 50;
    });
});

test('does not send email when person has less than 50 likes', function () {
    Mail::fake();

    $person = People::factory()->create();

    // Create 49 users who liked this person
    $users = User::factory()->count(49)->create();
    foreach ($users as $user) {
        UserPeopleInteraction::factory()->create([
            'user_id' => $user->id,
            'people_id' => $person->id,
            'action' => 'like',
        ]);
    }

    $this->artisan('people:check-popular')
        ->assertSuccessful();

    Mail::assertNothingSent();
});

test('sends separate emails for multiple people with 50 or more likes', function () {
    Mail::fake();

    $adminEmail = config('mail.from.address', 'admin@example.com');

    // Create first person with 51 likes
    $person1 = People::factory()->create();
    $users1 = User::factory()->count(51)->create();
    foreach ($users1 as $user) {
        UserPeopleInteraction::factory()->create([
            'user_id' => $user->id,
            'people_id' => $person1->id,
            'action' => 'like',
        ]);
    }

    // Create second person with 50 likes
    $person2 = People::factory()->create();
    $users2 = User::factory()->count(50)->create();
    foreach ($users2 as $user) {
        UserPeopleInteraction::factory()->create([
            'user_id' => $user->id,
            'people_id' => $person2->id,
            'action' => 'like',
        ]);
    }

    // Create third person with 60 likes
    $person3 = People::factory()->create();
    $users3 = User::factory()->count(60)->create();
    foreach ($users3 as $user) {
        UserPeopleInteraction::factory()->create([
            'user_id' => $user->id,
            'people_id' => $person3->id,
            'action' => 'like',
        ]);
    }

    // Create fourth person with 49 likes (should not trigger email)
    $person4 = People::factory()->create();
    $users4 = User::factory()->count(49)->create();
    foreach ($users4 as $user) {
        UserPeopleInteraction::factory()->create([
            'user_id' => $user->id,
            'people_id' => $person4->id,
            'action' => 'like',
        ]);
    }

    $this->artisan('people:check-popular')
        ->assertSuccessful();

    Mail::assertSentCount(3);
    Mail::assertSent(PopularPersonAlert::class, 3);

    // Verify each person received an email
    Mail::assertSent(PopularPersonAlert::class, function ($mail) use ($person1, $adminEmail) {
        return $mail->hasTo($adminEmail) &&
            $mail->person->id === $person1->id &&
            $mail->likesCount === 51;
    });

    Mail::assertSent(PopularPersonAlert::class, function ($mail) use ($person2, $adminEmail) {
        return $mail->hasTo($adminEmail) &&
            $mail->person->id === $person2->id &&
            $mail->likesCount === 50;
    });

    Mail::assertSent(PopularPersonAlert::class, function ($mail) use ($person3, $adminEmail) {
        return $mail->hasTo($adminEmail) &&
            $mail->person->id === $person3->id &&
            $mail->likesCount === 60;
    });
});

test('only counts likes, not dislikes', function () {
    Mail::fake();

    $person = People::factory()->create();

    // Create 30 likes
    $usersLikes = User::factory()->count(30)->create();
    foreach ($usersLikes as $user) {
        UserPeopleInteraction::factory()->create([
            'user_id' => $user->id,
            'people_id' => $person->id,
            'action' => 'like',
        ]);
    }

    // Create 25 dislikes (should not count)
    $usersDislikes = User::factory()->count(25)->create();
    foreach ($usersDislikes as $user) {
        UserPeopleInteraction::factory()->create([
            'user_id' => $user->id,
            'people_id' => $person->id,
            'action' => 'dislike',
        ]);
    }

    $this->artisan('people:check-popular')
        ->assertSuccessful();

    // Should not send email because only 30 likes (less than 50)
    Mail::assertNothingSent();
});

test('respects custom threshold option', function () {
    Mail::fake();

    $person = People::factory()->create();
    $adminEmail = config('mail.from.address', 'admin@example.com');

    // Create 30 likes
    $users = User::factory()->count(30)->create();
    foreach ($users as $user) {
        UserPeopleInteraction::factory()->create([
            'user_id' => $user->id,
            'people_id' => $person->id,
            'action' => 'like',
        ]);
    }

    // Run with custom threshold of 25
    $this->artisan('people:check-popular', ['--threshold' => 25])
        ->assertSuccessful();

    Mail::assertSent(PopularPersonAlert::class, function ($mail) use ($person, $adminEmail) {
        return $mail->hasTo($adminEmail) &&
            $mail->person->id === $person->id &&
            $mail->likesCount === 30;
    });
});
