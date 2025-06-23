import React, { useEffect, useState } from 'react';
import axiosClient from '../axios-client';
import { Link } from 'react-router-dom';
import { allPodcastsData, allGenresData, PlaceholderImage } from '../data/podcastsData'; 
import { AddPlaylist } from '../components/AddPlaylist'; 
import { playlistsData } from '../data/playlistsData'; 
import { useStateContext } from '../contexts/ContextsPorvider';

const PodcastCard = ({ id, image, title, channel, episode, rating, onAddToPlaylistClick }) => ( 
  <div className="block p-4 bg-[#eae7b1] rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <Link to={`/detail/${id}`} className="block">
      <div className="flex items-start gap-4">
        <img
          src={image || PlaceholderImage} 
          alt={title}
          className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
        />
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-[#3c6255] mb-1 leading-tight">{title}</h3>
          <p className="text-sm text-[#3c6255] mb-1 leading-snug">{channel} - {episode}</p>
          <div className="flex items-center text-[#3c6255] text-sm">
            <i className="ri-star-s-fill mr-1"></i>
            <p>{rating}</p>
          </div>
        </div>
      </div>
    </Link>

    <div className="flex gap-3 mt-4 ">
      <Link 
        to={`/detail/${id}#review-section`} 
        className='flex-1 min-w-0'
      >
        <button
          className="w-full bg-[#3c6255] rounded-md h-8 text-[#EAE7B1] flex justify-center items-center hover:bg-[#2c4f43] transition-colors duration-300 text-sm px-2"
        >
          <i className="ri-edit-2-line mr-1"></i> Review
        </button>
      </Link>
      <button
        className="flex-1 bg-[#3c6255] rounded-md h-8 text-[#EAE7B1] flex justify-center items-center hover:bg-[#2c4f43] transition-colors duration-300 text-sm px-2"
        onClick={() => onAddToPlaylistClick(id)} 
      >
        <i className="ri-heart-3-fill mr-1"></i>Playlist
      </button>
    </div>
  </div>
);

export const Genre = () => {
  const [isAddPlaylistPopupOpen, setIsAddPlaylistPopupOpen] = useState(false);
  const [podcastToAddId, setPodcastToAddId] = useState(null); 
  const {user,token,setUser,setToken}=useStateContext() 
  useEffect(() => {
    axiosClient.get('/user')
        .then(({data}) => {
          setUser(data)
        })
    }, [])

  const handleOpenAddPlaylistPopup = (id) => {
    setPodcastToAddId(id);
    setIsAddPlaylistPopupOpen(true);
  };

  const handleCloseAddPlaylistPopup = () => {
    setIsAddPlaylistPopupOpen(false);
    setPodcastToAddId(null);
  };

  const handleAddToPlaylist = (playlistId) => {
    const podcastToAddToPlaylist = allPodcastsData.find(p => p.id === podcastToAddId);
    if (podcastToAddToPlaylist) {
      const targetPlaylist = playlistsData.find(p => p.id === playlistId);
      if (targetPlaylist) {
        const episodeExists = targetPlaylist.episodes.some(ep => ep.id === podcastToAddToPlaylist.id);
        if (!episodeExists) {
          targetPlaylist.episodes.push({
            id: podcastToAddToPlaylist.id,
            image: podcastToAddToPlaylist.coverImage || PlaceholderImage, 
            podcastTitle: podcastToAddToPlaylist.channel, 
            episodeTitle: podcastToAddToPlaylist.title, 
            rating: podcastToAddToPlaylist.rating
          });
          console.log(`Podcast "${podcastToAddToPlaylist.title}" berhasil ditambahkan ke "${targetPlaylist.title}"`);
        } else {
          console.log(`Podcast "${podcastToAddToPlaylist.title}" sudah ada di "${targetPlaylist.title}"`);
        }
      }
    }
    handleCloseAddPlaylistPopup(); 
  };

  const genres = allGenresData.map(genre => ({
    ...genre,
    podcasts: allPodcastsData.filter(podcast =>
      podcast.info.genre === genre.name 
    ).slice(0, 2) 
  }));

  return (
    <div className="pb-4 pt-24 bg-[#eae7b1] min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-[#3c6255] font-bold text-2xl md:text-3xl">GENRE</h3>
        <hr className="border-t-2 border-[#3c6255] mt-10 my-2" />

        {genres.map((genre, index) => (
          <div key={genre.name} className="mb-12">
            <div className="flex justify-between items-center mb-6 mt-10">
              <h2 className="text-[#3c6255] font-bold text-2xl md:text-2xl">
                {genre.name}
              </h2>
              <Link to={`/genreview/${genre.name.toLowerCase().replace(/\s/g, '-')}`} className="flex items-center text-base text-[#3c6255] hover:underline">
                View all <i className="ri-arrow-right-double-line ml-1"></i>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
              {genre.podcasts.map((podcast) => (
                <PodcastCard
                  key={podcast.id}
                  id={podcast.id}
                  image={podcast.coverImage} 
                  title={podcast.title}
                  channel={podcast.channel} 
                  episode={podcast.episodes && podcast.episodes[0] ? podcast.episodes[0].title : 'No Episode Title'} 
                  rating={podcast.rating}
                  onAddToPlaylistClick={handleOpenAddPlaylistPopup} 
                />
              ))}
            </div>

            {index < genres.length - 1 && (
              <hr className="border-t-2 border-[#3c6255] my-12" />
            )}
          </div>
        ))}
      </div>

      <AddPlaylist
        isOpen={isAddPlaylistPopupOpen}
        onClose={handleCloseAddPlaylistPopup}
        playlists={playlistsData} 
        onAddToPlaylist={handleAddToPlaylist} 
      />
    </div>
  );
};