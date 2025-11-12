<?php

namespace App\Services;

use App\Models\People;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class PeopleService
{
    public function getRecommendedPeople(User $user, int $perPage = 15): LengthAwarePaginator
    {
        $query = People::query()
            ->where('user_id', '!=', $user->id);

        // Filter by opposite gender if user has a people profile
        if ($user->people && $user->people->gender) {
            $oppositeGender = $user->people->gender === 'M' ? 'F' : 'M';
            $query->where('gender', $oppositeGender);
        }

        $query->orderBy('name', 'asc');

        return $query->with('pictures')->latest()->paginate($perPage);
    }

    public function likePerson(User $user, int $peopleId): bool
    {
        $people = People::findOrFail($peopleId);

        $user->interactions()->updateOrCreate(
            [
                'user_id' => $user->id,
                'people_id' => $peopleId,
            ],
            [
                'action' => 'like',
            ]
        );

        return true;
    }

    public function dislikePerson(User $user, int $peopleId): bool
    {
        $people = People::findOrFail($peopleId);

        $user->interactions()->updateOrCreate(
            [
                'user_id' => $user->id,
                'people_id' => $peopleId,
            ],
            [
                'action' => 'dislike',
            ]
        );

        return true;
    }

    public function getLikedPeople(User $user): Collection
    {
        $likedPeopleIds = $user->interactions()
            ->where('action', 'like')
            ->pluck('people_id')
            ->toArray();

        return People::query()
            ->with('pictures')
            ->whereIn('id', $likedPeopleIds)
            ->get();
    }

    public function getPeopleWithLikesCount(int $threshold = 50): Collection
    {
        return People::query()
            ->withCount([
                'interactions as likes_count' => function ($query) {
                    $query->where('action', 'like');
                },
            ])
            ->get()
            ->filter(fn($person) => $person->likes_count >= $threshold)
            ->values();
    }

    public function undoLastAction(User $user): ?array
    {
        $lastInteraction = $user->interactions()
            ->latest('updated_at')
            ->first();

        if (! $lastInteraction) {
            return null;
        }

        $peopleId = $lastInteraction->people_id;
        $action = $lastInteraction->action;

        $lastInteraction->delete();

        return [
            'people_id' => $peopleId,
            'action' => $action,
        ];
    }

    public function getInteractedPeopleIds(User $user): array
    {
        return $user->interactions()
            ->pluck('people_id')
            ->toArray();
    }
}
