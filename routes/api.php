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

Route::get('/podcasts', [PodcastController::class, 'index']); // 🔓 Public
Route::get('/podcasts/{podcast}', [PodcastController::class, 'show']); // 🔓 Public
Route::get('/podcasts/{id}/related', [PodcastController::class, 'related']); // 🔓 Public

// ===================
// Authenticated Routes
// ===================

Route::middleware('auth:sanctum')->group(function () {
    // User Info & Auth
    Route::get('/user', fn(Request $request) => $request->user());
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::put('/user/profile-image', [UserController::class, 'updateProfileImage']);

    // CRUD for main entities (protected)
    Route::apiResource('/users', UserController::class);
    Route::apiResource('/channels', ChannelController::class);
    Route::apiResource('/reviews', ReviewController::class);
    Route::apiResource('/playlists', PlaylistController::class);

    // Hanya method selain GET untuk podcast (POST, PUT, DELETE)
    Route::post('/podcasts', [PodcastController::class, 'store']);
    Route::put('/podcasts/{podcast}', [PodcastController::class, 'update']);
    Route::delete('/podcasts/{podcast}', [PodcastController::class, 'destroy']);

    // Reviewed Podcasts for a User
    Route::get('/users/{user}/reviewed-podcasts', [ReviewedPodcastController::class, 'index']);

    // Playlist Custom Actions
    Route::post('/playlists/{id}/add', [PlaylistController::class, 'addPodcast']);
    Route::delete('/playlists/{playlist}/podcasts/{podcast}', [PlaylistController::class, 'removePodcast']);
    // Route::delete('/playlists/{id}/remove', [PlaylistController::class, 'removePodcast']);

    // Podcast Episodes (manual routes)
    Route::get('/podcasts/{podcast}/episodes', [EpisodeController::class, 'index']);
    Route::post('/podcasts/{podcast}/episodes', [EpisodeController::class, 'store']);
    Route::get('/episodes/{id}', [EpisodeController::class, 'show']);
    Route::put('/episodes/{id}', [EpisodeController::class, 'update']);
    Route::delete('/episodes/{id}', [EpisodeController::class, 'destroy']);

    // Add review to podcast
    Route::post('/podcasts/{podcast}/reviews', [ReviewController::class, 'store']);
});