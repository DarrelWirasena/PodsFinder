<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Auth;
use App\Http\Resources\PlaylistResource;
use App\Http\Resources\PodcastResource;
use Symfony\Component\HttpFoundation\Response; // untuk HTTP code 403 dan 422
use App\Http\Controllers\Controller;
use App\Models\Playlist;
use App\Models\Podcast;
use Illuminate\Http\Request;

class PlaylistController extends Controller
{

    public function podcasts(Playlist $playlist) {
    return PodcastResource::collection($playlist->podcasts);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        $playlists = Playlist::with('user', 'podcasts')
            ->where('user_id', $user->id)
            ->get();

        return PlaylistResource::collection($playlists);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'title' => 'required|string|max:200',
        ]);

        $playlist = Playlist::create($validated);

        return (new PlaylistResource($playlist->load('podcasts')))
            ->response()
            ->setStatusCode(201);
    }


    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $playlist = Playlist::with('podcasts')->findOrFail($id);
        return new PlaylistResource($playlist);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Playlist $playlist)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $playlist = Playlist::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:200',
            
        ]);

        $playlist->update($validated);
        return new PlaylistResource($playlist);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $playlist = Playlist::findOrFail($id);
        $playlist->delete();

        return response()->json(['message' => 'Playlist deleted successfully.']);

    }

    public function addPodcast(Request $request, $id)
    {
        $request->validate([
            'podcast_id' => 'required|exists:podcasts,id',
        ]);

        $playlist = Playlist::with('podcasts')->findOrFail($id);

        // Cek kepemilikan playlist
        if ($playlist->user_id !== auth()->id()) {
            return response()->json(['message' => 'Forbidden'], Response::HTTP_FORBIDDEN);
        }

        // ❗ Cek apakah podcast sudah ada dalam playlist
        if ($playlist->podcasts()->where('podcast_id', $request->podcast_id)->exists()) {
            return response()->json([
                'message' => 'Podcast already exists in this playlist.'
            ], Response::HTTP_UNPROCESSABLE_ENTITY); // 422
        }

        // Tambahkan podcast
        $playlist->podcasts()->attach($request->podcast_id);

        // Reload playlist lengkap
        $playlist->load(['podcasts', 'user']);

        return new PlaylistResource($playlist);
    }

    public function removePodcast(Playlist $playlist, Podcast $podcast)
    {
        $playlist->podcasts()->detach($podcast->id);
        return response()->json(['message' => 'Podcast removed from playlist.']);
    }

}
