// Merged and cleaned Detail.jsx using backend data with UI and logic from both versions

import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextsPorvider';
import { AddPlaylist } from '../components/AddPlaylist';
// import { playlistsData } from '../data/playlistsData';
import { PlaceholderImage } from '../data/podcastsData';

// Card components
import EpisodeCard from '../components/EpisodeCard';
import ReviewCard from '../components/ReviewCard';
import RelatedPodcastCard from '../components/RelatedPodcastCard';

export const Detail = () => {
  const { podcastId } = useParams();
  const location = useLocation();
  const { user, token, setUser } = useStateContext();

  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [relatedPodcasts, setRelatedPodcasts] = useState([]);
  const [isAddPlaylistPopupOpen, setIsAddPlaylistPopupOpen] = useState(false);
  const [podcastToAddId, setPodcastToAddId] = useState(null);
  const [newReviewText, setNewReviewText] = useState('');
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [newReviewRating, setNewReviewRating] = useState('5');
  const [initialSelectedPlaylistIds, setInitialSelectedPlaylistIds] = useState([]);


  useEffect(() => {
    axiosClient.get('/user')
      .then(({ data }) => setUser(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    axiosClient.get(`/podcasts/${podcastId}`)
      .then(({ data }) => {
        setSelectedPodcast(data.data);
      })
      .catch(() => setSelectedPodcast(null));
  }, [podcastId]);

  useEffect(() => {
    axiosClient.get(`/podcasts/${podcastId}/related`)
      .then(({ data }) => setRelatedPodcasts(data.data))
      .catch(console.error);
  }, [podcastId]);

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        element.focus();
      }
    }
  }, [location]);

  useEffect(() => {
    if (user) {
      axiosClient.get('/playlists')
        .then(({ data }) => setPlaylists(data.data))
        .catch(console.error);
    }
  }, [user]);

  const getSelectedPlaylistsForPodcast = (podcastId) => {
    return playlists
      .filter(pl => pl.podcasts?.some(p => p.id === podcastId)) // periksa apakah ada podcast dalam relasi
      .map(pl => pl.id); // ambil hanya id-nya
  };


  const handleOpenAddPlaylistPopup = (id) => {
    if (!token) {
      alert('Harus Login!');
      return;
    }
    setPodcastToAddId(id); // simpan id podcast yang ingin ditambahkan
    const selectedIds = getSelectedPlaylistsForPodcast(id); // cari playlist yang sudah punya podcast ini
    setInitialSelectedPlaylistIds(selectedIds); // set ke state
    setIsAddPlaylistPopupOpen(true); // buka popup
  };

  const handleCloseAddPlaylistPopup = () => {
    setIsAddPlaylistPopupOpen(false);
    setPodcastToAddId(null);
  };

  // Fungsi untuk mulai edit review
  const handleEditReview = (id, comment, rating) => {
    setEditingReviewId(id);
    setNewReviewText(comment);
    setNewReviewRating(String(rating)); // rating harus dalam string agar sesuai dengan <select>
  };

  // Fungsi untuk batalkan edit
  const handleCancelEdit = () => {
    setEditingReviewId(null);
    setNewReviewText('');
    setNewReviewRating('5.0');
  };

  // Fungsi untuk simpan hasil edit
  const handleSaveEditReview = (id, comment, rating) => {
    axiosClient.put(`/reviews/${id}`, {
      comment,
      rating: parseInt(rating)
    })
    .then(() => axiosClient.get(`/podcasts/${podcastId}`))
    .then(({ data }) => {
      setSelectedPodcast(data.data);
      setEditingReviewId(null);
      setNewReviewText('');
      setNewReviewRating('5.0');
    })
    .catch(console.error);
  };

// Fungsi untuk hapus review
  const handleDeleteReview = (id) => {
    if (!confirm('Yakin ingin menghapus review ini?')) return;

    setIsDeleting(true); // mulai loading

    axiosClient.delete(`/reviews/${id}`)
      .then(() => axiosClient.get(`/podcasts/${podcastId}`))
      .then(({ data }) => {
        setSelectedPodcast(data.data); // pastikan ini .data (karena dari resource API)
      })
      .catch(console.error)
      .finally(() => {
        setIsDeleting(false); // selesai loading
      });
  };

  const handleCreateNewPlaylist = async (newName) => {
    if (!newName || newName.trim() === '') {
      alert('Nama playlist tidak boleh kosong.');
      return null;
    }

    try {
      const { data } = await axiosClient.post('/playlists', {
        title: newName.trim(),
        user_id: user.id
      });

      // Tambahkan playlist baru langsung ke daftar yang ada tanpa fetch ulang
      setPlaylists(prev => [...prev, data.data]);

      return data.data.id;
    } catch (error) {
      console.error(error);
      if (error.response?.status === 422) {
        alert('Gagal validasi: ' + JSON.stringify(error.response.data.errors));
      } else {
        alert('Gagal membuat playlist');
      }
      return null;
    }
  };



  const handleSubmitReview = () => {
    if (!token) {
      alert('Harus Login!');
      return;
    }
  if (!newReviewText) return;
    axiosClient.post(`/podcasts/${podcastId}/reviews`, {
      comment: newReviewText,
      rating: parseInt(newReviewRating)
    })
    .then(() => {
      setNewReviewText('');
      setNewReviewRating('5.0');
      // refresh reviews
      return axiosClient.get(`/podcasts/${podcastId}`);
    })
    .then(({ data }) => {
      setSelectedPodcast(data.data);
    })
    .catch(console.error);
  };

  const handleAddToPlaylist = async (playlistIds, podcastId) => {
    if (!podcastId || !Array.isArray(playlistIds) || playlistIds.length === 0) return;

    try {
      for (let id of playlistIds) {
        await axiosClient.post(`/playlists/${id}/add`, {
          podcast_id: podcastId,
        });
      }

      const updated = await axiosClient.get('/playlists');
      setPlaylists(updated.data.data);
      handleCloseAddPlaylistPopup();
    } catch (error) {
      if (error.response?.status === 422) {
        alert('Podcast sudah ada dalam salah satu playlist.');
      } else {
        console.error(error);
      }
    }
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
            <img src={selectedPodcast.image_url ? `${import.meta.env.VITE_API_BASE_URL}/storage/podcast/${selectedPodcast.image_url}` : PlaceholderImage} alt="Background" className="w-full max-h-[350px] object-cover rounded-lg opacity-50"/>
            <img src={selectedPodcast.image_url ? `${import.meta.env.VITE_API_BASE_URL}/storage/podcast/${selectedPodcast.image_url}` : PlaceholderImage} alt="Cover" className="absolute inset-0 m-auto w-3/5 md:w-3/4 max-w-[173px] object-cover rounded-lg shadow-lg"/>
          </div>

          <div className="w-full md:w-3/5 text-center md:text-left">
            <Link to={`/detailchannel/${selectedPodcast.channelId}`} className='text-xl text-[#3c6255] mb-2 hover:underline'>
              <p>{selectedPodcast.channel?.name}</p>
            </Link>
            <h1 className="text-4xl md:text-5xl font-semibold text-[#3c6255] mb-4">{selectedPodcast.title}</h1>
            <div className="flex items-center justify-center md:justify-start mb-4">
              <p className="text-4xl text-[#3c6255] mr-2">{selectedPodcast.average_rating}</p>
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
                  coverSrc={rel.image_url ? `${import.meta.env.VITE_API_BASE_URL}/storage/podcast/${rel.image_url}` : PlaceholderImage}
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
            <div className="relative w-full p-6 bg-[#a6bb8d]/80 rounded-md overflow-hidden mb-6 flex flex-col">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                  <img src={`/storage/profile/${user?.img_url}`} alt="User Avatar" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-left text-[#3c6255]">{user?.name}</p>
                  <p className="text-base text-left text-[#3c6255]">{user?.email}</p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <i className="ri-star-s-fill text-yellow-500 text-lg mr-1"></i>
                  <select
                    className="px-2 py-1 bg-[#3c6255] rounded-md text-[#eae7b1] cursor-pointer appearance-none pr-6 hover:bg-[#2c4f43] transition-colors text-base"
                    value={newReviewRating}
                    onChange={(e) => setNewReviewRating(e.target.value)}
                  >
                    <option value="5">5</option>
                    <option value="4">4</option>
                    <option value="3">3</option>
                    <option value="2">2</option>
                    <option value="1">1</option>
                  </select>
                </div>
              </div>

              <textarea
                id="add-review-input"
                value={newReviewText}
                onChange={(e) => setNewReviewText(e.target.value)}
                placeholder="Tambahkan review..."
                className="w-full p-2 rounded-md bg-[#eae7b1] text-base text-[#3c6255] border border-[#3c6255] focus:outline-none focus:border-[#2c4f43] resize-y mb-4"
                rows="3"
              />

              <button
                onClick={handleSubmitReview}
                className="self-end px-4 py-2 bg-[#3c6255] text-[#eae7b1] rounded-md shadow-md hover:opacity-90"
              >
                Kirim Review
              </button>
</div>


          <div className="flex flex-col">
            {selectedPodcast.reviews?.length > 0 ? (
              [...selectedPodcast.reviews]
                .sort((a, b) => {
                  const isAUser = a.user?.id === user?.id;
                  const isBUser = b.user?.id === user?.id;
                  return isBUser - isAUser; // true = 1, false = 0 → sort true (user review) to top
                })
                .map((rev, i) => (
                  <ReviewCard
                    key={rev.id}
                    id={rev.id}
                    avatarSrc={rev.image_url ? `${import.meta.env.VITE_API_BASE_URL}/storage/podcast/${rev.image_url}` : `${import.meta.env.VITE_API_BASE_URL}/storage/profile/defaultPP.webp` }
                    name={rev.user?.name}
                    email={rev.user?.email}
                    reviewText={rev.comment}
                    rating={rev.rating}
                    reviewUserId={rev.user?.id}
                    currentUserId={user?.id}
                    isEditing={editingReviewId === rev.id}
                    onEdit={handleEditReview}
                    onCancelEdit={handleCancelEdit}
                    onSaveEdit={handleSaveEditReview}
                    onDelete={handleDeleteReview}
                    isDeleting={isDeleting}
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
              <p className="text-base font-semibold mb-4">{selectedPodcast.creator}</p>
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
        playlists={playlists}
        onAddToPlaylist={handleAddToPlaylist}
        onCreateNewPlaylist={handleCreateNewPlaylist}
        currentPodcastId={podcastToAddId}
        initialSelectedPlaylistIds={initialSelectedPlaylistIds}
      />

    </div>
  );
};
