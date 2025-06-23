<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Episode extends Model
{
    protected $fillable = ['podcast_id', 'title', 'description', 'published_at'];

    public function podcast()
    {
        return $this->belongsTo(Podcast::class);
    }
}
