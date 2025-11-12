<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class People extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'name', 'age', 'location', 'gender'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function interactions(): HasMany
    {
        return $this->hasMany(\App\Models\UserPeopleInteraction::class);
    }

    public function pictures(): HasMany
    {
        return $this->hasMany(Picture::class)->orderBy('order');
    }
}
