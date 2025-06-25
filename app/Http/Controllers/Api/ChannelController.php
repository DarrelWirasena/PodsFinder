<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Channel;
use Illuminate\Http\Request;

class ChannelController extends Controller
{

    public function podcasts(Channel $channel) {
        return PodcastResource::collection($channel->podcasts);
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ChannelResource::collection(Channel::with('podcasts')->get());
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
        $data = $request->validate([
            'name' => 'required|string|max:200',
            'description' => 'nullable|string',
            'img_url' => 'nullable|url',
        ]);

        $channel = Channel::create($data);
        return ChannelResource::collection($channel, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $channel = Channel::with('podcasts')->findOrFail($id);
        return ChannelResource::collection($channel);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Channel $channel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $channel = Channel::findOrFail($id);

        $data = $request->validate([
            'name' => 'sometimes|required|string|max:200',
            'description' => 'nullable|string',
            'img_url' => 'nullable|url',
        ]);

        $channel->update($data);
        return ChannelResource::collection($channel);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $channel = Channel::findOrFail($id);
        $channel->delete();

        return ChannelResource::collection(['message' => 'Channel deleted']);
    }
}
