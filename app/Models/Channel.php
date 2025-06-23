<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Channel extends Model
{
    protected $fillable = ['name', 'description', 'img_url'];

    public function podcasts()
    {
        return $this->hasMany(Podcast::class);
    }
}
