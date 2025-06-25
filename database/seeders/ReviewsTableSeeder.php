<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
// use Illuminate\Database\Seeder;
use App\Models\Review;
use App\Models\Podcast;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class ReviewsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $users = User::pluck('id')->toArray(); // ambil semua user id
        $faker = \Faker\Factory::create();

        Podcast::all()->each(function ($podcast) use ($users, $faker) {
            // Ambil user secara acak dan unik
            $uniqueUserIds = collect($users)->shuffle()->take(rand(3, 6));

            foreach ($uniqueUserIds as $userId) {
                Review::create([
                    'user_id'     => $userId,
                    'podcast_id'  => $podcast->id,
                    'rating'      => rand(1, 5),
                    'comment'     => $faker->sentence(),
                    'created_at'  => now()->subDays(rand(0, 365)),
                    'updated_at'  => now(),
                ]);
            }
        });
}

}
