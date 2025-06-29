<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Review;
use App\Http\Resources\ReviewResource;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    // GET /api/reviews
    public function index()
    {   
        $query = Review::query();

        // Filter berdasarkan user_id jika tersedia
        if ($request->has('user_id')) {
        $query->where('user_id', $request->user_id);
        }

        // Filter berdasarkan podcast_id jika tersedia
        if ($request->has('podcast_id')) {
        $query->where('podcast_id', $request->podcast_id);
        }
        
        // Ambil hasil review dengan relasi user dan podcast
        $reviews = $query->with(['user', 'podcast'])->get();

        return ReviewResource::collection($reviews);
    }

    // POST /api/reviews
    public function store(Request $request, $podcastId)
    {
        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:10',
            'comment' => 'nullable|string',
        ]);

        $review = new Review();
        $review->user_id = auth()->id();
        $review->podcast_id = $podcastId;
        $review->rating = $validated['rating'];
        $review->comment = $validated['comment'] ?? '';
        $review->save();

        return new ReviewResource($review);
    }


    // GET /api/reviews/{id}
    public function show($id)
    {
        $review = Review::with(['user', 'podcast'])->findOrFail($id);
        return ReviewResource::collection($review);
    }

    // PUT /api/reviews/{id}
    public function update(Request $request, $id)
    {
        $review = Review::findOrFail($id);

        $validated = $request->validate([
            'rating' => 'sometimes|required|integer|min:1|max:5',
            'comment' => 'nullable|string',
        ]);

        $review->update($validated);

        return new ReviewResource($review);
    }

    // DELETE /api/reviews/{id}
    public function destroy($id)
    {
        $review = Review::findOrFail($id);
        $review->delete();

        return response()->json(['message' => 'Review deleted successfully.'], 200);
    }
}
