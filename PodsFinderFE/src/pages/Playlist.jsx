import React, { useEffect, useState } from "react";
import axiosClient from '../axios-client';
import { Link } from 'react-router-dom';
import { playlistsData as initialPlaylistsData } from '../data/playlistsData';
import { PlaceholderImage } from '../data/podcastsData'; 
import { AddNewPlaylist } from '../components/AddNewPlaylist'; 
import { useStateContext } from '../contexts/ContextsPorvider';

const PlaylistSectionHeader = ({ title, linkTo = '#', onDelete }) => (
  <div className="flex ml-8 justify-between items-center mb-4">
    <h2 className="text-2xl md:text-3xl font-medium text-left text-[#3c6255]">{title}</h2>
    <div className="flex items-center space-x-4">
      <Link to={linkTo} className="flex items-center text-base text-[#3c6255] hover:underline">
        View all <i className="ri-arrow-right-double-line ml-1"></i>
      </Link>
      {onDelete && (
        <button onClick={onDelete} className="text-red-600 text-xl hover:text-red-800">
          <i className="ri-delete-bin-line"></i>
        </button>
      )}
    </div>
  </div>
);

const EpisodeItemCard = ({ image, channel, title, rating, onTriggerConfirm, episodeId, podcastId, channelId }) => (
    <div className="relative flex flex-col ml-8 mr-8 sm:flex-row items-start sm:items-center gap-4 p-4 bg-[#eae7b1] rounded-lg shadow-md overflow-hidden">
        <img src={image || PlaceholderImage} alt="Episode Cover" className="w-28 h-28 rounded object-cover flex-shrink-0" />
        
        <div className="flex-grow min-w-0 flex-basis-0 overflow-hidden max-w-full"> 
            <Link to={`/detail/${podcastId}`} className="block">
                <p className="text-base text-[#3c6255] mb-1 truncate whitespace-nowrap overflow-hidden w-full">{channel}</p>
                <h3 className="text-lg font-semibold text-[#3c6255] mb-2 truncate whitespace-nowrap overflow-hidden w-full">{title}</h3>
                <div className="flex items-center text-[#3c6255]">
                    <p className="text-base leading-none">{rating}</p>
                    <i className="ri-star-s-fill text-base leading-none ml-1"></i>
                </div>
            </Link>
            {channelId && channel && ( 
                <Link
                    to={`/detailchannel/${channelId}`} 
                    className="text-sm text-[#3c6255] mt-2 hover:underline hover:text-[#2c4f43] transition-colors block truncate whitespace-nowrap overflow-hidden w-full"
                    onClick={(e) => e.stopPropagation()} 
                >
                    Channel: {channel} <i className="ri-share-box-line ml-1"></i>
                </Link>
            )}
        </div>

        <button
            className="
                absolute top-2 right-2 p-1 z-10 
                text-xl text-[#3c6255] 
                cursor-pointer transition-colors duration-200 hover:text-red-500
                md:static md:ml-auto md:p-0 md:text-xl
                ri-delete-bin-fill"
            onClick={(e) => {
                e.preventDefault(); 
                e.stopPropagation(); 
                onTriggerConfirm(episodeId);
            }}
        >
        </button>
    </div>
);

export const Playlist = ({ }) => { 
    // const [localPlaylistsData, setLocalPlaylistsData] = useState(initialPlaylistsData);
    const [isAddNewPlaylistPopupOpen, setIsAddNewPlaylistPopupOpen] = useState(false);
    const {user,token,setUser,setToken}=useStateContext() 
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
    if (!token) return;

    axiosClient.get('/playlists').then(({ data }) => {
        setPlaylists(data.data); // asumsikan kamu sudah pakai PlaylistResource
    });

    axiosClient.get('/user').then(({ data }) => {
        setUser(data);
    });
    }, [token]);


    const handleOpenAddNewPlaylistPopup = () => {
        setIsAddNewPlaylistPopupOpen(true);
    };

    const handleCloseAddNewPlaylistPopup = () => {
        setIsAddNewPlaylistPopupOpen(false);
    };

    const handleCreateNewPlaylist = async (playlistName) => {
        if (!playlistName || playlistName.trim() === '') {
            alert('Nama playlist tidak boleh kosong.');
            return;
        }

        try {
            const { data } = await axiosClient.post('/playlists', {
            title: playlistName.trim(),
            user_id: user.id,
            });

            // Langsung tambahkan playlist baru ke state
            setPlaylists(prev => [...prev, data.data]);

            alert(`Playlist "${playlistName}" berhasil dibuat!`);
        } catch (error) {
            console.error(error);
            if (error.response?.status === 422) {
            alert('Gagal validasi: ' + JSON.stringify(error.response.data.errors));
            } else {
            alert('Gagal membuat playlist');
            }
        }
    };

    const handleDeletePlaylist = async (playlistId) => {
        const confirmed = window.confirm("Yakin ingin menghapus playlist ini?");
        if (!confirmed) return;

        try {
            await axiosClient.delete(`/playlists/${playlistId}`);
            setPlaylists(prev => prev.filter(p => p.id !== playlistId));
            alert("Playlist berhasil dihapus.");
        } catch (error) {
            console.error(error);
            alert("Gagal menghapus playlist.");
        }
    };


    const handleDeletePodcastFromPlaylist = async (playlistId, podcastId) => {
        const isConfirmed = window.confirm("Apakah Anda yakin ingin menghapus episode ini dari playlist?");
        if (!isConfirmed) return;

        try {
            await axiosClient.delete(`/playlists/${playlistId}/podcasts/${podcastId}`);

            // Refresh playlist dari backend
            const updated = await axiosClient.get('/playlists');
            setPlaylists(updated.data.data);

            alert("Episode berhasil dihapus dari playlist!");
        } catch (error) {
            console.error(error);
            alert("Gagal menghapus episode.");
        }
    };



    return (
        <div className='min-h-screen bg-[#eae7b1] p-4 md:p-8 pt-24'>
            <div className="container mx-auto">
                <div className="mb-8 ml-8 mr-8 flex items-center justify-between">
                    <p className="text-[32px] font-bold text-left text-[#3c6255] mb-2">Playlists</p>
                    <button
                        onClick={handleOpenAddNewPlaylistPopup}
                        className="text-4xl text-[#3c6255] hover:text-[#2c4f43] transition-colors"
                        aria-label="Buat playlist baru"
                    >
                        <i className="ri-add-circle-fill"></i>
                    </button>
                </div>
                <hr className="border-t-2 border-[#3c6255] mx-8" />

                <div className="space-y-12 mt-8">
                    {playlists.length > 0 ? (
                        playlists.map((playlist) => (
                            <div key={playlist.id}>
                                <PlaylistSectionHeader
                                    title={playlist.title}
                                    linkTo={`/playlistviewall/${playlist.id}`}
                                    onDelete={() => handleDeletePlaylist(playlist.id)}
                                />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {playlist.podcasts.length > 0 ? (
                                        playlist.podcasts.slice(0, 2).map((podcast) => (
                                            <EpisodeItemCard
                                                key={podcast.id}
                                                image={podcast.image_url ? `${import.meta.env.VITE_API_BASE_URL}/storage/podcast/${podcast.image_url}` : PlaceholderImage}
                                                channel={podcast.channel?.name}
                                                title={podcast.title}
                                                rating={podcast.average_rating}
                                                onTriggerConfirm={() => handleDeletePodcastFromPlaylist(playlist.id, podcast.id)}
                                                episodeId={podcast.latest_episode?.id}
                                                podcastId={podcast.id}
                                                channelId={podcast.channel?.id}
                                            />
                                        ))
                                    ) : (
                                        <p className="ml-8 text-[#3c6255]">Tidak ada episode di playlist ini.</p>
                                    )}
                                </div>
                                <hr className="ml-8 mr-8 border-t-2 border-[#3c6255] mt-8" />
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-[#3c6255] text-xl mt-12">Belum ada playlist. Buat yang pertama!</p>
                    )}
                </div>
            </div>

            <AddNewPlaylist
                isOpen={isAddNewPlaylistPopupOpen}
                onClose={handleCloseAddNewPlaylistPopup}
                onCreateNewPlaylist={handleCreateNewPlaylist}
            />
        </div>
    );
};