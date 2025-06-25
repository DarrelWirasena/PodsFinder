import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { playlistsData as initialPlaylistsData } from '../data/playlistsData';
import { PlaceholderImage } from '../data/podcastsData'; 
import { AddNewPlaylist } from '../components/AddNewPlaylist'; 

const PlaylistSectionHeader = ({ title, linkTo = '#' }) => (
    <div className="flex ml-8 justify-between items-center mb-4">
        <h2 className="text-2xl md:text-3xl font-medium text-left text-[#3c6255] ">{title}</h2>
        <Link to={linkTo} className="flex items-center text-base text-[#3c6255] hover:underline">
            View all
            <i className="ri-arrow-right-double-line w-5 h-5 ml-1 flex items-center mr-8 justify-center"></i>
        </Link>
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
    const [localPlaylistsData, setLocalPlaylistsData] = useState(initialPlaylistsData);
    const [isAddNewPlaylistPopupOpen, setIsAddNewPlaylistPopupOpen] = useState(false);

    const handleOpenAddNewPlaylistPopup = () => {
        setIsAddNewPlaylistPopupOpen(true);
    };

    const handleCloseAddNewPlaylistPopup = () => {
        setIsAddNewPlaylistPopupOpen(false);
    };

    const handleCreateNewPlaylistLocally = async (playlistName, playlistImage) => { 
        const newPlaylist = {
            id: 'pl-' + Date.now().toString() + Math.random().toString().substring(2, 8),
            title: playlistName.trim(),
            image: playlistImage || PlaceholderImage,
            episodes: [], 
        };
        setLocalPlaylistsData(prevPlaylists => [...prevPlaylists, newPlaylist]);
        alert(`Playlist "${playlistName}" berhasil dibuat!`); 
    };

    const handleDeleteEpisodeFromPlaylist = (playlistId, episodeIdToDelete) => {
        const isConfirmed = window.confirm("Apakah Anda yakin ingin menghapus episode ini dari playlist?");
        if (isConfirmed) {
            setLocalPlaylistsData(prevPlaylists =>
                prevPlaylists.map(playlist =>
                    playlist.id === playlistId
                        ? { ...playlist, episodes: playlist.episodes.filter(ep => ep.id !== episodeIdToDelete) }
                        : playlist
                )
            );
            alert("Episode berhasil dihapus dari playlist!");
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
                    {localPlaylistsData.length > 0 ? (
                        localPlaylistsData.map((playlist) => (
                            <div key={playlist.id}>
                                <PlaylistSectionHeader
                                    title={playlist.title}
                                    linkTo={`/playlistviewall/${playlist.id}`}
                                />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {playlist.episodes.length > 0 ? (
                                        playlist.episodes.slice(0, 2).map((episode) => (
                                            <EpisodeItemCard
                                                key={episode.id}
                                                image={episode.image}
                                                channel={episode.channel}
                                                title={episode.title}
                                                rating={episode.rating}
                                                onTriggerConfirm={() => handleDeleteEpisodeFromPlaylist(playlist.id, episode.id)}
                                                episodeId={episode.id}
                                                podcastId={episode.podcastId}
                                                channelId={episode.channelId}
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
                onCreateNewPlaylist={handleCreateNewPlaylistLocally} 
            />
        </div>
    );
};