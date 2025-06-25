<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Playlist extends Model
{

    protected $fillable = ['user_id', 'title'];


    public function user()
    {
        return $this->belongsTo(User::class);
    }


    // Playlist.php
    public function podcasts()
    {
        return $this->belongsToMany(Podcast::class, 'playlist_podcast');
    }

}
