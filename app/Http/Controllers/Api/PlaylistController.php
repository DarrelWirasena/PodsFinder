<?php

namespace App\Http\Controllers\Api;

use App\Models\Playlist;
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
        $playlists = Playlist::with('podcasts')->get();
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
            'description' => 'nullable|string',
        ]);

        $playlist = Playlist::create($validated);
        return PodcastResource::collection($playlist, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $playlist = Playlist::with('podcasts')->findOrFail($id);
        return PodcastResource::collection($playlist);
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
            'description' => 'nullable|string',
        ]);

        $playlist->update($validated);
        return PodcastResource::collection($playlist);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $playlist = Playlist::findOrFail($id);
        $playlist->delete();

        return PodcastResource::collection(['message' => 'Playlist deleted successfully.']);
    }

    public function addPodcast(Request $request, $id)
    {
        $request->validate([
            'podcast_id' => 'required|exists:podcasts,id',
        ]);

        $playlist = Playlist::findOrFail($id);
        $playlist->podcasts()->syncWithoutDetaching($request->podcast_id);

        return PodcastResource::collection(['message' => 'Podcast added to playlist.']);
    }

    public function removePodcast(Request $request, $id)
    {
        $request->validate([
            'podcast_id' => 'required|exists:podcasts,id',
        ]);

        $playlist = Playlist::findOrFail($id);
        $playlist->podcasts()->detach($request->podcast_id);

        return PodcastResource::collection(['message' => 'Podcast removed from playlist.']);
    }

}
