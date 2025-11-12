<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserPeopleInteraction extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'people_id', 'action'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function people(): BelongsTo
    {
        return $this->belongsTo(People::class);
    }
}
