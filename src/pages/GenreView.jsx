import React, { useState } from 'react'; 
import { useParams, Link } from 'react-router-dom';
import { allPodcastsData, allGenresData, PlaceholderImage } from '../data/podcastsData';
import { AddPlaylist } from '../components/AddPlaylist'; 
import { playlistsData } from '../data/playlistsData'; 

export const GenreView = () => {
  const { genreName } = useParams();
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

  const selectedGenre = allGenresData.find(
    (genre) => genre.name.toLowerCase() === genreName.toLowerCase()
  );

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
        <hr className="border-t-2 border-[#3c6255] mt-6 my-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {genrePodcasts.length > 0 ? (
            genrePodcasts.map((podcast) => (
              <div key={podcast.id} className="block p-4 bg-[#eae7b1] rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 mx-auto w-full max-w-lg sm:max-w-none">
  <Link to={`/detail/${podcast.id}`} className="block">
    <div className="flex items-start gap-4">
      <img
        src={podcast.coverImage || PlaceholderImage} 
        alt={podcast.title}
        className="w-24 h-24 rounded-lg object-cover flex-shrink-0" 
      />
      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-[#3c6255] mb-1 leading-tight">{podcast.title}</h3>
        <p className="text-sm text-[#3c6255] mb-1 leading-snug">
          {podcast.channel} - {podcast.episodes && podcast.episodes[0] ? podcast.episodes[0].title : 'No Episode Title'}
        </p>
        <div className="flex items-center text-[#3c6255] text-sm">
          <i className="ri-star-s-fill mr-1"></i>
          <p>{podcast.rating}</p>
        </div>
      </div>
    </div>
  </Link>

  <div className="flex gap-3 mt-4 "> 
    <Link 
      to={`/detail/${podcast.id}#review-section`} 
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
      onClick={() => handleOpenAddPlaylistPopup(podcast.id)} 
    >
      <i className="ri-heart-3-fill mr-1"></i>Playlist
    </button>
  </div>
</div>
            ))
          ) : (
            <p className="text-base text-left text-[#3c6255]">No podcasts found for this genre.</p>
          )}
        </div>
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