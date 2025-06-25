<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
// use Illuminate\Database\Seeder;
use App\Models\Episode;
use Illuminate\Support\Carbon;

class EpisodeSeeder extends Seeder
{
    public function run()
    {
        foreach (range(4, 21) as $podcastId) {
            $totalEpisodes = rand(3, 10);

            for ($i = 1; $i <= $totalEpisodes; $i++) {
                Episode::create([
                    'podcast_id' => $podcastId,
                    'title' => "Episode $i",
                    'description' => "Deskripsi untuk episode $i dari podcast $podcastId",
                    'release_date' => Carbon::now()->subDays(rand(1, 100)),
                ]);
            }
        }
    }
}
