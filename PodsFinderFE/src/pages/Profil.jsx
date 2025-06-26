import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import ProfileImageDefault from '../assets/images/michelle.jpg';
import { PlaceholderImage } from '../data/podcastsData';
import EditProfil from '../components/EditProfil';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextsPorvider';


const UserProfile = ({ profileImage, username, onClick }) => {
  const imageUrl = profileImage?.image_url ? `${import.meta.env.VITE_API_BASE_URL}/storage/profil/${profileImage.image_url}` : `${import.meta.env.VITE_API_BASE_URL}/storage/profile/defaultPP.webp`;


  return (
    <div
      className="flex items-center cursor-pointer hover:opacity-80 transition-opacity duration-200"
      onClick={onClick}
    >
      <img
        src={imageUrl}
        alt="Profile"
        className="w-16 h-16 rounded-full mr-4 object-cover"
      />
      <div>
        <p className="text-xl font-semibold text-[#3c6255]">{username}</p>
      </div>
    </div>
  );
};

const PlaylistCard = ({ playlist }) => (
  <Link to={`/playlistviewall/${playlist.id}`} className="block bg-[#3c6255] p-2 w-auto h-auto rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <h2 className="text-2xl font-semibold text-[#eae7b1] mb-4">{playlist.title}</h2>
    <div className="flex flex-wrap gap-2 mb-4 justify-center">
      {playlist.podcasts.slice(0, 4).map((podcast, index) => (
        <img
          key={index}
          src={podcast.image_url ? `${import.meta.env.VITE_API_BASE_URL}/storage/podcast/${podcast.image_url}` : PlaceholderImage}
          alt={`Podcast ${index + 1}`}
          className="w-20 h-20 rounded object-cover aspect-square"
        />
      ))}
    </div>
  </Link>
);

const EpisodeCard = ({ podcast }) => (
  <Link to={`/detail/${podcast.id}`} className="block">
    <div className="flex items-center mb-6 p-4 border border-[#3c6255] rounded-lg shadow-sm bg-[#EAE7B1] hover:shadow-md transition-shadow duration-300">
      <img
        src={podcast.image || `/storage/${podcast.image_url}` || PlaceholderImage}
        alt={podcast.podcastTitle || podcast.title}
        className="w-28 h-28 rounded object-cover mr-4 flex-shrink-0"
      />
      <div>
        <p className="text-base text-[#3c6255]">{podcast.podcastTitle || podcast.title}</p>
        <h3 className="text-lg font-semibold text-[#3c6255] mb-1">{podcast.episodeTitle || 'Latest episode not available'}</h3>
        <div className="flex items-center text-[#3c6255]">
          <i className="ri-star-s-fill mr-1"></i>
          <p>{podcast.rating ?? podcast.average_rating ?? '-'}</p>
        </div>
        <p className="text-sm text-[#3c6255] mt-2">
          Channel: {podcast.channelName ? (
            <Link
              to={`/detailchannel/${podcast.channelId}`}
              className="hover:underline hover:text-[#2c4f43] transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              {podcast.channelName} <i className="ri-share-box-line ml-1"></i>
            </Link>
          ) : (
            <span className="italic text-gray-500">-</span>
          )}
        </p>
      </div>
    </div>
  </Link>
);

export const Profil = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(ProfileImageDefault);
  const [playlists, setPlaylists] = useState([]);
  const [reviewedPodcasts, setReviewedPodcasts] = useState([]);

  const { user, token, setUser, setToken } = useStateContext()

  useEffect(() => {
    if (!token) return;

    axiosClient.get('/user').then(({ data }) => {
      setUser(data);
    });
  }, [token]);

  useEffect(() => {
    if (user?.id) {
      axiosClient.get('/playlists').then(({ data }) => {
        const userPlaylists = data.data.filter(p => p.user?.id === user.id);
        setPlaylists(userPlaylists);
      });

      axiosClient.get(`/users/${user.id}/reviewed-podcasts`).then(({ data }) => {
        setReviewedPodcasts(data.data);
      });
    }
  }, [user?.id]);


  const onLogout = (ev) => {
    ev.preventDefault();
    axiosClient.post('/logout').then(() => {
      setUser({});
      setToken(null);
    });
  };

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-[#eae7b1] p-4 md:p-8 pt-24">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-between items-start mb-10">
          <UserProfile
            profileImage={{
              image_url: user.img_url // ← Ambil dari backend
            }}
            username={user.name}
            onClick={() => setIsEditOpen(true)}
          />
          <button
            onClick={onLogout}
            className="bg-[#3c6255] text-[#eae7b1] px-4 py-2 rounded-md hover:opacity-90"
          >
            Log out
          </button>
        </div>

        <hr className="border-t-2 border-[#3c6255] my-6" />

        <h2 className="text-2xl font-bold text-[#3c6255] mb-6">Daftar Playlist</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {playlists.slice(0, 4).map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>

        <h2 className="text-2xl font-bold text-[#3c6255] mb-6">Already Reviewed</h2>
        <hr className="border-t-2 border-[#3c6255] my-8" />
        <div className="flex flex-col gap-4">
          {reviewedPodcasts.slice(0, 3).map((podcast) => (
            <EpisodeCard
              key={podcast.id}
              podcast={{
                ...podcast,
                episodeTitle: podcast.latest_episode?.title || 'No episode info',
                podcastTitle: podcast.title,
                image: podcast.image_url ? `${import.meta.env.VITE_API_BASE_URL}/storage/podcast/${podcast.image_url}` : PlaceholderImage,
                rating: podcast.average_rating,
                channelId: podcast.channel?.id,
                channelName: podcast.channel?.name
              }}
            />
          ))}
        </div>

        <div className="flex justify-start mt-8">
          <Link
            to="/"
            className="bg-[#3c6255] ri-arrow-left-wide-fill text-[#eae7b1] px-6 py-2 rounded-md flex items-center hover:opacity-90"
          >
            Back
          </Link>
        </div>
      </div>

      <EditProfil
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        currentUsername={user.name}
        currentProfileUrl={
          user.img_url
            ? `${import.meta.env.VITE_API_BASE_URL}/storage/profil/${user.img_url}`
            : `${import.meta.env.VITE_API_BASE_URL}/storage/profil/defaultPP.webp`
        }
        onSave={({ username, profileFile }) => {
          axiosClient.put('/user', { name: username });
          setUser((prev) => ({ ...prev, name: username }));

          if (profileFile) {
            const formData = new FormData();
            formData.append('image', profileFile);
            axiosClient
              .post('/user/profile-image', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              })
              .then(({ data }) => {
                setUser((prev) => ({ ...prev, img_url: data.img_url }));
              });
          }
          console.log("profileFile:", profileFile);

        }}
      />
    </div>
  );
};
