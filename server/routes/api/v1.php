<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\PeopleController;
use App\Http\Controllers\API\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [UserController::class, 'show']);

    Route::get('/people', [PeopleController::class, 'index']);
    Route::post('/people/like', [PeopleController::class, 'like']);
    Route::post('/people/dislike', [PeopleController::class, 'dislike']);
    Route::post('/people/undo', [PeopleController::class, 'undo']);
    Route::get('/people/liked', [PeopleController::class, 'liked']);
    Route::get('/people/interactions', [PeopleController::class, 'interactions']);
});
