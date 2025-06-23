<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Podcast;
use App\Http\Resources\PodcastResource;
use Illuminate\Http\Request;

class ReviewedPodcastController extends Controller
{
    /**
     * Display a listing of podcasts reviewed by a specific user.
     *
     * @param int $userId
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index($userId)
    {
        if (auth()->id() !== $user->id) {
            return response()->json(['message' => 'Forbidden'], Response::HTTP_FORBIDDEN);
        }

        $podcasts = Podcast::whereHas('reviews', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })->distinct()->get();

        return PodcastResource::collection($podcasts);
    }
}
