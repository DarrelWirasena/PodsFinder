<?php
// namespace App\Http\Controllers\Api;

// use App\Http\Controllers\Api\AuthController;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

// Route::post('/signup', [AuthController::class, 'signup']);
// Route::post('/login', [AuthController::class, 'login']);
// Route::post('/logout', [AuthController::class, 'logout']);

// <?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ChannelController;
use App\Http\Controllers\Api\EpisodeController;
use App\Http\Controllers\Api\PlaylistController;
use App\Http\Controllers\Api\PodcastController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\ReviewedPodcastController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('channels', ChannelController::class);
    Route::apiResource('podcasts', PodcastController::class);
    Route::apiResource('reviews', ReviewController::class);
    Route::apiResource('playlists', PlaylistController::class);
    Route::post('playlists/{id}/add', [PlaylistController::class, 'addPodcast']);
    Route::delete('playlists/{id}/remove', [PlaylistController::class, 'removePodcast']);
    Route::get('podcasts/{podcast}/episodes', [EpisodeController::class, 'index']);
    Route::post('podcasts/{podcast}/episodes', [EpisodeController::class, 'store']);
    Route::get('episodes/{id}', [EpisodeController::class, 'show']);
    Route::put('episodes/{id}', [EpisodeController::class, 'update']);
    Route::delete('episodes/{id}', [EpisodeController::class, 'destroy']);

});

Route::middleware('auth:sanctum')->put('/user/profile-image', [UserController::class, 'updateProfileImage']);

Route::middleware('auth:sanctum')->get('/users/{user}/reviewed-podcasts', [ReviewedPodcastController::class, 'index']);

Route::get('public-podcasts', [PodcastController::class, 'index']); // untuk guest

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::apiResource('/users', UserController::class);
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
