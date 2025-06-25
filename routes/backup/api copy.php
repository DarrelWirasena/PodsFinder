<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ChannelController;
use App\Http\Controllers\Api\PodcastController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\PlaylistController;
use App\Http\Controllers\Api\EpisodeController;
use App\Http\Controllers\Api\ReviewedPodcastController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// ===================
// Public Routes
// ===================

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/public-podcasts', [PodcastController::class, 'index']);
Route::get('/podcasts/{id}/related', [PodcastController::class, 'related']);

// ===================
// Authenticated Routes
// ===================

Route::middleware('auth:sanctum')->group(function () {
    // User Info & Auth
    Route::get('/user', fn(Request $request) => $request->user());
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::put('/user/profile-image', [UserController::class, 'updateProfileImage']);

    // CRUD for main entities
    Route::apiResource('/users', UserController::class);
    Route::apiResource('/channels', ChannelController::class);
    Route::apiResource('/podcasts', PodcastController::class);
    Route::apiResource('/reviews', ReviewController::class);
    Route::apiResource('/playlists', PlaylistController::class);

    // Reviewed Podcasts for a User
    Route::get('/users/{user}/reviewed-podcasts', [ReviewedPodcastController::class, 'index']);

    // Playlist Custom Actions
    Route::post('/playlists/{id}/add', [PlaylistController::class, 'addPodcast']);
    Route::delete('/playlists/{id}/remove', [PlaylistController::class, 'removePodcast']);

    // Podcast Episodes (manual routes)
    Route::get('/podcasts/{podcast}/episodes', [EpisodeController::class, 'index']);
    Route::post('/podcasts/{podcast}/episodes', [EpisodeController::class, 'store']);
    Route::get('/episodes/{id}', [EpisodeController::class, 'show']);
    Route::put('/episodes/{id}', [EpisodeController::class, 'update']);
    Route::delete('/episodes/{id}', [EpisodeController::class, 'destroy']);

    // Add review to podcast (custom endpoint if different from /reviews)
    Route::post('/podcasts/{podcast}/reviews', [ReviewController::class, 'store']);
});
