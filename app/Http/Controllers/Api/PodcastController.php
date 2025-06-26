<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Podcast;
use App\Http\Resources\PodcastResource;
use Illuminate\Http\Request;

class PodcastController extends Controller
{

    public function show($id)
    {
        $podcast = Podcast::with(['channel', 'episodes', 'reviews.user'])->findOrFail($id);
        return new PodcastResource($podcast);   
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
         return PodcastResource::collection(
            Podcast::with(['channel', 'latestEpisode', 'reviews'])->get()
        );
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
    public function store(StorePodcastRequest $request)
    {
        $podcast = Podcast::create($request->validated());
        return new PodcastResource($podcast);
    }

    public function edit(Podcast $podcast)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
    $podcast = Podcast::findOrFail($id);

    $validated = $request->validate([
        'title' => 'sometimes|required|string|max:255',
        'description' => 'nullable|string',
        'channel_id' => 'nullable|exists:channels,id',
        'creator' => 'sometimes|required|string|max:255',
        'start_year' => 'sometimes|required|integer',
        'end_year' => 'nullable|integer',
        'genre' => 'sometimes|required|string|max:100',
    ]);

    $podcast->update($validated);

    return response()->json($podcast);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
    $podcast = Podcast::findOrFail($id);
    $podcast->delete();

    return response()->json(['message' => 'Podcast deleted successfully']);
    }

    public function search(Request $request)
    {
        $query = $request->query('query'); // ✅ sesuai dengan URL frontend

        if (!$query) {
            return response()->json([
                'message' => 'Query kosong',
                'data' => []
            ]);
        }

        $results = Podcast::with('channel', 'latestEpisode', 'reviews')
            ->where('title', 'like', "%$query%")
            ->orWhere('genre', 'like', "%$query%")
            ->orWhereHas('channel', function ($q) use ($query) {
                $q->where('name', 'like', "%$query%");
            })
            ->get();

        return PodcastResource::collection($results);
    }



    public function related($id)
    {
        $podcast = Podcast::findOrFail($id);

        $related = Podcast::where('id', '!=', $podcast->id)
            ->where('genre', $podcast->genre)
            ->latest()
            ->take(6)
            ->get();

        return PodcastResource::collection($related);
    }

}
