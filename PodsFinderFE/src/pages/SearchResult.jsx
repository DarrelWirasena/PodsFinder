import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axiosClient from '../axios-client';
import { AddPlaylist } from '../components/AddPlaylist';
import { playlistsData } from '../data/playlistsData';
import { PlaceholderImage } from '../data/podcastsData';
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

    <div className="flex gap-3 mt-4">
      <Link to={`/detail/${id}#review-section`} className='flex-1 min-w-0'>
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

export default function SearchResult() {
  const location = useLocation();
  const results = location.state?.results || [];
  const { user } = useStateContext();

  const [isAddPlaylistPopupOpen, setIsAddPlaylistPopupOpen] = useState(false);
  const [podcastToAddId, setPodcastToAddId] = useState(null);

  const handleOpenAddPlaylistPopup = (id) => {
    setPodcastToAddId(id);
    setIsAddPlaylistPopupOpen(true);
  };

  const handleCloseAddPlaylistPopup = () => {
    setIsAddPlaylistPopupOpen(false);
    setPodcastToAddId(null);
  };

  const handleAddToPlaylist = (playlistId) => {
    // TODO: integrasi ke backend nanti
    console.log(`Tambahkan podcast ID ${podcastToAddId} ke playlist ID ${playlistId}`);
    handleCloseAddPlaylistPopup();
  };

  return (
    <div className="pb-4 pt-24 bg-[#eae7b1] min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-[#3c6255] font-bold text-2xl md:text-3xl mb-6">Search Results</h3>

        {results.length === 0 ? (
          <p className="text-[#3c6255]">No results found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
            {results.map((podcast) => (
              <PodcastCard
                key={podcast.id}
                id={podcast.id}
                image={podcast.image_url ? `${import.meta.env.VITE_API_BASE_URL}/storage/podcast/${podcast.image_url}` : PlaceholderImage}
                title={podcast.title}
                channel={podcast.channel?.name || 'Unknown'}
                episode={podcast.latest_episode?.title || 'No Episode Title'}
                rating={podcast.average_rating}
                onAddToPlaylistClick={handleOpenAddPlaylistPopup}
              />
            ))}
          </div>
        )}
      </div>

      <AddPlaylist
        isOpen={isAddPlaylistPopupOpen}
        onClose={handleCloseAddPlaylistPopup}
        playlists={playlistsData}
        onAddToPlaylist={handleAddToPlaylist}
      />
    </div>
  );
}
