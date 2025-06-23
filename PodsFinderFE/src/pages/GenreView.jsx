import React, { useEffect, useState } from 'react';
import axiosClient from '../axios-client';
import { useParams, Link } from 'react-router-dom';
import { allPodcastsData, allGenresData, PlaceholderImage } from '../data/podcastsData';
import { useStateContext } from '../contexts/ContextsPorvider';

export const GenreView = () => {
  const { genreName } = useParams();
  const {user,token,setUser,setToken}=useStateContext() 
  useEffect(() => {
    axiosClient.get('/user')
        .then(({data}) => {
          setUser(data)
        })
    }, [])
  console.log("1. genreName from URL:", genreName);
  const selectedGenre = allGenresData.find(
    (genre) => genre.name.toLowerCase() === genreName.toLowerCase()
  );
  console.log("2. selectedGenre object:", selectedGenre);

  if (!selectedGenre) {
    return (
      <div className="min-h-screen bg-[#eae7b1] flex items-center justify-center text-[#3c6255] text-2xl font-bold">
        Genre "{genreName}" not found.
      </div>
    );
  }

  const genrePodcasts = allPodcastsData.filter(
    (podcast) => podcast.info.genre.toLowerCase() === selectedGenre.name.toLowerCase()
  );
  
  return (
    <div className="min-h-screen bg-[#eae7b1] pb-10">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-[#3c6255] md:ml-10 pt-4 font-bold text-3xl">
          {selectedGenre.name} Podcasts
        </h1>
        <hr className="border-t border-[#3c6255] w-auto my-6 ml-10 md:mr-10" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {genrePodcasts.length > 0 ? (
            genrePodcasts.map((podcast) => (
              <div key={podcast.id} className="bg-[#eae7b1] gap-4 p-4 rounded-lg shadow-md ml-8 mr-8">
                <div className="flex items-start gap-4 mb-4">
                  <Link to={`/detail/${podcast.id}`}> 
                    <img
                      src={podcast.coverImage || PlaceholderImage} 
                      alt={podcast.title}
                      className="w-28 h-28 object-cover rounded-md flex-shrink-0"
                    />
                  </Link>

                  <div className="flex flex-col justify-center flex-grow">
                    <Link to={`/detail/${podcast.id}`} className="hover:underline">
                      <h2 className="text-xl font-semibold text-[#3c6255] leading-tight">{podcast.title}</h2>
                    </Link>
                    <p className="text-base text-[#3c6255] mt-1">{podcast.episodes[0]?.title || 'No episode info'}</p>
                    <div className="flex items-center text-[#3c6255] mt-2">
                      <i className="ri-star-s-fill mr-1"></i>
                      <p>{podcast.rating}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <button className="bg-[#3c6255] text-[#eae7b1] px-3 py-1.5 rounded-md text-sm hover:opacity-90 flex items-center">
                    <i className="ri-edit-2-line mr-1"></i> Review
                  </button>
                  <button className="bg-[#3c6255] text-[#eae7b1] px-3 py-1.5 rounded-md text-sm hover:opacity-90 flex items-center">
                    <i className="ri-heart-3-fill mr-1"></i> Playlist
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-base text-left text-[#3c6255]">No podcasts found for this genre.</p>
          )}
        </div>
      </div>
    </div>
  );
};