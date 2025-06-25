<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Podcast extends Model
{
    // Podcast.php
    public function playlists()
    {
        return $this->belongsToMany(Playlist::class, 'playlist_podcast');
    }

    public function episodes()
    {
        return $this->hasMany(Episode::class);
    }

    public function channel()
    {
        return $this->belongsTo(Channel::class);
    }

    public function latestEpisode()
    {
        return $this->hasOne(Episode::class)->latest('release_date');
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}
