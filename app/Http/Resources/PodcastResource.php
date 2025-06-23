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
            'category'      => $this->category,
            'genre'         => $this->genre,
            'creator'       => $this->creator,
            'start_year'    => $this->start_year,
            'end_year'      => $this->end_year,
            'episodes_count' => $this->episodes()->count(),
            'channel'       => new ChannelResource($this->whenLoaded('channel')),
        ];
    }
}
