<?php

namespace App\Http\Controllers\Api;

use App\Models\Podcast;
use Illuminate\Http\Request;

class PodcastController extends Controller
{

    public function show($id)
    {
    $podcast = Podcast::with('channel', 'episodes')->findOrFail($id);

    return response()->json($podcast);
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return PodcastResource::collection(Podcast::with(['channel'])->get());
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

    /**
     * Display the specified resource.
     */
    // public function show(Podcast $podcast)
    // {
    //     //
    // }

    /**
     * Show the form for editing the specified resource.
     */
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

}
