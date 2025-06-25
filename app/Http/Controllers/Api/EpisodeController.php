<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Episode;
use App\Models\Podcast;
use Illuminate\Http\Request;

class EpisodeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($podcast_id)
    {
        $episodes = Episode::where('podcast_id', $podcast_id)->get();
        return EpisodeResource::collection($episodes);
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
    public function store(Request $request, $podcast_id)
    {
        $request->validate([
            'title' => 'required|string|max:200',
            'description' => 'nullable|string',
            'published_at' => 'required|date',
        ]);

        $episode = Episode::create([
            'podcast_id' => $podcast_id,
            'title' => $request->title,
            'description' => $request->description,
            'published_at' => $request->published_at,
        ]);

        return new EpisodeResource($episode, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $episode = Episode::findOrFail($id);
        return EpisodeResource::collection($episode);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Episode $episode)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $episode = Episode::findOrFail($id);

        $request->validate([
            'title' => 'sometimes|required|string|max:200',
            'description' => 'nullable|string',
            'published_at' => 'sometimes|required|date',
        ]);

        $episode->update($request->all());
        return EpisodeResource::collection($episode);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $episode = Episode::findOrFail($id);
        $episode->delete();

        return EpisodeResource::collection(['message' => 'Episode deleted']);
    }
}
