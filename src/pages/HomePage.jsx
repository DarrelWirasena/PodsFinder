import React from 'react';
import { Link } from 'react-router-dom';
import PodsLogo from '../assets/images/PodsFinderHook.png';
import Image from '../assets/images/headphone.png';

import { allPodcastsData, BerizikCover, Bapak2BangetCover, NightRide, PlaceholderImage } from '../data/podcastsData';

const PodcastCard = ({ podcast }) => (
  <Link to={`/detail/${podcast.id}`} className="block p-4 bg-[#eae7b1] rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <div className="flex items-start gap-4">
      <img
        src={podcast.coverImage || PlaceholderImage} 
        alt={podcast.title}
        className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
      />
      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-[#3c6255] mb-1 leading-tight">{podcast.title}</h3>
        <p className="text-sm text-[#3c6255] mb-1 leading-snug">
            {podcast.episodes && podcast.episodes.length > 0 ? podcast.episodes[0].title : 'No Episode Info'}
        </p>
        <div className="flex items-center text-[#3c6255] text-sm">
          <i className="ri-star-s-fill mr-1"></i>
          <p>{podcast.rating}</p>
        </div>
      </div>
    </div>
    <div className="gap-3 mt-4 grid grid-cols-2"> 
      <button
        onClick={(e) => { e.preventDefault(); console.log(`Review button clicked for ID: ${podcast.id}`); }}
        className="flex-1 bg-[#3c6255] rounded-md h-8 text-[#EAE7B1] flex justify-center items-center hover:bg-[#2c4f43] transition-colors duration-300 text-sm px-2"
      >
        <i className="ri-edit-2-line mr-1"></i> Review
      </button>
      <button
        onClick={(e) => { e.preventDefault(); console.log(`Playlist button clicked for ID: ${podcast.id}`); }}
        className="flex-1 bg-[#3c6255] rounded-md h-8 text-[#EAE7B1] flex justify-center items-center hover:bg-[#2c4f43] transition-colors duration-300 text-sm px-2"
      >
        <i className="ri-heart-3-fill mr-1"></i> Playlist
      </button>
    </div>
  </Link>
);

export const HomePage = () => {
    const homepageGenreNames = ['Komedi', 'Horor']; 

    const featuredGenresData = homepageGenreNames.map(genreName => {
        const podcasts = allPodcastsData.filter(podcast =>
            podcast.info && podcast.info.genre && podcast.info.genre.toLowerCase() === genreName.toLowerCase()
        );

        const limitedPodcasts = podcasts.slice(0, 2);

        return {
            name: genreName,
            podcasts: limitedPodcasts,
        };
    }).filter(genre => genre.podcasts.length > 0); 

  return (
    <div className="homepage pb-4 bg-[#EAE7B1]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <div className="hero grid md:grid-cols-2 items-center gap-10 pt-20 pb-10 md:pt-32 md:pb-20 lg:pt-2">
          <div className="text-center md:text-left">
            <h1 className='text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-7 text-[#3c6255] leading-tight'>
              Lagi Cari Podcast Baru yang Bikin Nagih?
            </h1>
            <p className='text-base md:text-lg mb-6 md:mb-7 text-[#3c6255]'>
              Dapatkan kurasi podcast terbaik dari berbagai genre. Ulasan dari pendengar sejati bukan sekedar sinopsis.
            </p>
            <Link to="/genre" className='inline-block bg-[#3c6255] hover:bg-[#2c4f43] transition-colors duration-300 py-3 px-8 text-[#EAE7B1] shadow rounded-full'>
              Find Your Vibes
            </Link>
          </div>
          <div className="flex justify-center md:justify-end">
            <img src={PodsLogo} alt="Logo Image" className='w-full max-w-md md:max-w-full' />
          </div>
        </div>

        <hr className="border-t-2 border-[#3c6255] my-12" />

        {featuredGenresData.map((genre, index) => (
          <div key={genre.name} className="mb-12">
            <div className="flex justify-between items-center mb-6 mt-10">
              <h2 className="text-[#3c6255] font-bold text-2xl md:text-2xl">
                {genre.name}
              </h2>
              <Link to={`/genreview/${encodeURIComponent(genre.name.toLowerCase())}`} className="flex items-center text-base text-[#3c6255] hover:underline">
                View all <i className="ri-arrow-right-double-line ml-1"></i>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
              {genre.podcasts.map((podcast) => (
                <PodcastCard
                  key={podcast.id}
                  podcast={podcast} 
                />
              ))}
            </div>

            {index < featuredGenresData.length - 1 && (
              <hr className="border-t-2 border-[#3c6255] my-12" />
            )}
          </div>
        ))}

        <Link to="/genre" className="box-link">
          <div className="box-all-genre bg-[#3c6255] h-8 w-30 rounded-lg flex justify-center items-center hover:bg-[#2c4f43] mx-auto mt-20">
            <p className='text text-[#EAE7B1]'>All Genre</p>
          </div>
        </Link>
      </div>
    </div>
  );
};