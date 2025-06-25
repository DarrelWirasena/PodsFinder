<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PodcastResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
       return [
            'id'            => $this->id,
            'title'         => $this->title,
            'description'   => $this->description,
            'image_url'     => $this->image_url,
            'creator'       => $this->creator_name,
            'start_year'    => $this->start_year,
            'end_year'      => $this->end_year,
            'genre'         => $this->genre,
            'episodes_count'=> $this->episodes()->count(),
            'channel'       => new ChannelResource($this->whenLoaded('channel')),
            'episodes'      => EpisodeResource::collection($this->whenLoaded('episodes')),
            'latest_episode' => new EpisodeResource($this->whenLoaded('latestEpisode')),
            'average_rating' => round($this->reviews()->avg('rating'), 1),
            'reviews' => ReviewResource::collection($this->whenLoaded('reviews')),
        ];

    }
}
