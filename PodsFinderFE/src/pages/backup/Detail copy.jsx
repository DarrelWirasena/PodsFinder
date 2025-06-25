// Merged and cleaned Detail.jsx using backend data with UI and logic from both versions

import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextsPorvider';
import { AddPlaylist } from '../components/AddPlaylist';
import { playlistsData } from '../data/playlistsData';
import { PlaceholderImage } from '../data/podcastsData';

// Card components
import EpisodeCard from '../components/EpisodeCard';
import ReviewCard from '../components/ReviewCard';
import RelatedPodcastCard from '../components/RelatedPodcastCard';

export const Detail = () => {
  const { podcastId } = useParams();
  const location = useLocation();
  const { user, setUser } = useStateContext();

  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [relatedPodcasts, setRelatedPodcasts] = useState([]);
  const [isAddPlaylistPopupOpen, setIsAddPlaylistPopupOpen] = useState(false);
  const [podcastToAddId, setPodcastToAddId] = useState(null);

  useEffect(() => {
    axiosClient.get(`/podcasts/${podcastId}`)
      .then(({ data }) => {
        setSelectedPodcast(data);
      })
      .catch(() => setSelectedPodcast(null));
  }, [podcastId]);

  useEffect(() => {
    axiosClient.get(`/podcasts/${podcastId}/related`)
      .then(({ data }) => setRelatedPodcasts(data.data))
      .catch(console.error);
  }, [podcastId]);

  useEffect(() => {
    axiosClient.get('/user')
      .then(({ data }) => setUser(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        element.focus();
      }
    }
  }, [location]);

  const handleOpenAddPlaylistPopup = (id) => {
    setPodcastToAddId(id);
    setIsAddPlaylistPopupOpen(true);
  };

  const handleCloseAddPlaylistPopup = () => {
    setIsAddPlaylistPopupOpen(false);
    setPodcastToAddId(null);
  };

  const handleAddToPlaylist = (playlistId) => {
    const podcastToAdd = selectedPodcast;
    const targetPlaylist = playlistsData.find(p => p.id === playlistId);

    if (podcastToAdd && targetPlaylist) {
      const exists = targetPlaylist.episodes.some(ep => ep.id === podcastToAdd.id);
      if (!exists) {
        targetPlaylist.episodes.push({
          id: podcastToAdd.id,
          image: `/storage/podcast/${podcastToAdd.image_url}`,
          podcastTitle: podcastToAdd.channel?.name,
          episodeTitle: podcastToAdd.title,
          rating: podcastToAdd.rating
        });
      }
    }
    handleCloseAddPlaylistPopup();
  };

  if (selectedPodcast === null) {
    return (
      <div className="min-h-screen bg-[#eae7b1] p-4 md:p-8 flex flex-col items-center justify-center pt-24">
        <p className="text-2xl text-[#3c6255] mb-4">Podcast "{podcastId}" tidak ditemukan.</p>
        <Link to="/genre" className='bg-[#3c6255] text-[#eae7b1] px-6 py-2 rounded-md flex items-center hover:opacity-90'>
          <i className="ri-arrow-left-wide-fill mr-2"></i>
          Kembali ke Genre
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eae7b1] pt-24 px-4 py-8">
      <div className="max-w-screen-lg mx-auto bg-[#eae7b1] rounded-lg shadow-xl p-6 md:p-8">

        {/* Header */}
        <section className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
          <div className="relative w-full md:w-2/5 flex justify-center items-center">
            <img src={`/storage/podcast/${selectedPodcast.image_url}`} alt="Background" className="w-full max-h-[350px] object-cover rounded-lg opacity-50"/>
            <img src={`/storage/podcast/${selectedPodcast.image_url}`} alt="Cover" className="absolute inset-0 m-auto w-3/5 md:w-3/4 max-w-[173px] object-cover rounded-lg shadow-lg"/>
          </div>

          <div className="w-full md:w-3/5 text-center md:text-left">
            <Link to={`/detailchannel/${selectedPodcast.channelId}`} className='text-xl text-[#3c6255] mb-2 hover:underline'>
              <p>{selectedPodcast.channel?.name}</p>
            </Link>
            <h1 className="text-4xl md:text-5xl font-semibold text-[#3c6255] mb-4">{selectedPodcast.title}</h1>
            <div className="flex items-center justify-center md:justify-start mb-4">
              <p className="text-4xl text-[#3c6255] mr-2">{selectedPodcast.rating}</p>
              <span className="text-4xl text-[#3c6255]">
                <i className="ri-star-s-fill"></i>
              </span>
            </div>
            <p className="text-base text-[#3c6255] leading-relaxed">{selectedPodcast.description}</p>

            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-6">
              <button
                className="border-2 border-[#3c6255] rounded-md px-6 py-2 text-[#3c6255] hover:bg-[#d0c69d] transition-colors"
                onClick={() => document.getElementById('add-review-input')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
              >
                <i className="ri-edit-2-line mr-2"></i> Review
              </button>
              <button
                className="border-2 border-[#3c6255] rounded-md px-6 py-2 text-[#3c6255] hover:bg-[#d0c69d] transition-colors"
                onClick={() => handleOpenAddPlaylistPopup(selectedPodcast.id)}
              >
                <i className="ri-heart-3-fill mr-2"></i> Playlist
              </button>
            </div>
          </div>
        </section>

        {/* Episodes */}
        <div className="border-b-2 border-[#3C6255] my-12"></div>
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-[#3c6255] mb-6">Latest Episodes</h2>
          <div className="space-y-8">
            {selectedPodcast.episodes?.map((ep, i) => (
              <EpisodeCard key={i} title={ep.title} date={ep.release_date} description={ep.description} />
            ))}
          </div>
        </section>

        {/* Related */}
        <div className="border-b-2 border-[#3C6255] my-12"></div>
        <section className="mb-12">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-semibold text-[#3c6255]">Related Podcasts</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPodcasts.length > 0 ? (
              relatedPodcasts.map((rel) => (
                <RelatedPodcastCard
                  key={rel.id}
                  id={rel.id}
                  title={rel.title}
                  channel={rel.channel?.name}
                  coverSrc={`/storage/podcast/${rel.image_url}`}
                  rating={rel.average_rating}
                  onAddToPlaylistClick={handleOpenAddPlaylistPopup}
                />
              ))
            ) : (
              <p className="text-base text-[#3c6255]">Tidak ada podcast terkait.</p>
            )}
          </div>
        </section>

        {/* Reviews */}
        <div className="border-b-2 border-[#3C6255] my-12"></div>
        <section className="mb-12" id="review-section">
          <div className="w-full p-6 bg-[#a6bb8d]/50 rounded-md mb-6 flex items-center">
            <div className="w-[70px] h-[70px] rounded-full overflow-hidden mr-4">
              <img src={`/storage/profile/${user?.img_url}`} alt="User Avatar" className="w-full h-full object-cover"/>
            </div>
            <input
              id="add-review-input"
              className="flex-grow text-base p-2 bg-transparent border-b-2 border-[#3c6255] focus:outline-none"
              placeholder="Tambahkan review..."
              disabled
            />
          </div>

          <div className="flex flex-col">
            {selectedPodcast.reviews?.length > 0 ? (
              selectedPodcast.reviews.map((rev, i) => (
                <ReviewCard
                  key={i}
                  avatarSrc={`/storage/profile/${rev.user?.img_url}`}
                  name={rev.user?.name}
                  email={rev.user?.email}
                  reviewText={rev.comment}
                />
              ))
            ) : (
              <p className="text-base text-[#3c6255]">Belum ada review untuk podcast ini.</p>
            )}
          </div>
        </section>

        {/* Info */}
        <div className="border-b-2 border-[#3C6255] my-12"></div>
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#3c6255] mb-6">Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#eae7b1] p-4 rounded-lg shadow-md">
              <p className="text-xs mb-1">Channel</p>
              <p className="text-base font-semibold mb-4">{selectedPodcast.channel?.name}</p>
              <p className="text-xs mb-1">Creator</p>
              <p className="text-base font-semibold mb-4">{selectedPodcast.creator_name}</p>
              <p className="text-xs mb-1">Show-Web</p>
              <p className="text-base font-semibold">{selectedPodcast.show_web}</p>
            </div>
            <div className="bg-[#eae7b1] p-4 rounded-lg shadow-md">
              <p className="text-xs mb-1">Years Active</p>
              <p className="text-base font-semibold mb-4">{`${selectedPodcast.start_year} - ${selectedPodcast.end_year || 'Sekarang'}`}</p>
              <p className="text-xs mb-1">Episodes</p>
              <p className="text-base font-semibold mb-4">{selectedPodcast.episodes?.length || 0}</p>
              <p className="text-xs mb-1">Genre</p>
              <p className="text-base font-semibold">{selectedPodcast.genre}</p>
            </div>
            <div className="bg-[#eae7b1] p-4 rounded-lg shadow-md">
              <p className="text-xs mb-1">License</p>
              <p className="text-base font-semibold mb-4">{selectedPodcast.license}</p>
              <p className="text-xs mb-1">Copyright</p>
              <p className="text-base font-semibold mb-4">{selectedPodcast.copyright}</p>
            </div>
          </div>
        </section>

        <div className="flex justify-start mt-8">
          <Link to="/genre" className="px-4 py-2 bg-[#3c6255] text-[#eae7b1] rounded-md shadow-md hover:opacity-90">
            <i className="ri-arrow-left-wide-fill mr-2"></i> Back to Genre
          </Link>
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
