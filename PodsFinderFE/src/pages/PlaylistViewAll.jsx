import React, { useEffect, useState } from 'react';
import axiosClient from '../axios-client';
import { useParams, Link } from 'react-router-dom';
import { PlaceholderImage } from '../data/podcastsData';
import { playlistsData } from '../data/playlistsData'; 

const PlaylistItem = ({
    title,
    channel,
    rating,
    imageUrl,
    onTriggerConfirm,
    episodeId,
    podcastId, 
    channelId 
}) => {
    return (
        <div className="block">
            <div className="relative flex flex-col ml-8 mr-8 sm:flex-row items-start sm:items-center gap-4 p-4 bg-[#eae7b1] rounded-lg shadow-md flex-grow hover:shadow-lg transition-shadow duration-300">
            
                <img
                    src={imageUrl || PlaceholderImage}
                    alt={title}
                    className="w-28 h-28 rounded object-cover flex-shrink-0"
                />

                <div className="ml-4 flex-grow text-[#3c6255]">
                <Link to={`/detail/${podcastId}`} className="block">
                    <p className="text-base mb-1">{channel}</p>
                    <h3 className="text-lg font-semibold leading-tight mt-1 mb-2">
                        {title}
                    </h3>
                    <div className="flex items-center text-[#3c6255]">
                        <p className="text-base leading-none">{rating}</p>
                        <i alt="Star rating" className="ri-star-s-fill text-base leading-none ml-1" />
                    </div>
                    </Link>
                    {channelId && channel && ( 
                        <Link
                            to={`/detailchannel/${channelId}`}
                            className="text-sm text-[#3c6255] mt-2 hover:underline hover:text-[#2c4f43] transition-colors"
                            onClick={(e) => e.stopPropagation()} 
                        >
                            Channel: {channel} <i className="ri-share-box-line ml-1"></i>
                        </Link>
                    )}
                </div>

                <button
                    className="
                        absolute top-0 right-0 p-2 z-10
                        text-2xl text-[#3c6255]
                        cursor-pointer transition-colors duration-200 hover:text-red-500
                        md:static md:ml-auto md:p-0 md:text-xl
                        ri-delete-bin-fill
                    "
                    onClick={(e) => {
                        e.preventDefault(); 
                        e.stopPropagation(); 
                        onTriggerConfirm(episodeId);
                    }}
                >
                </button>
            </div>
        </div>
    );
};

export const PlaylistViewAll = ({ onTriggerConfirm }) => {
    const { playlistId } = useParams();
    const selectedPlaylist = playlistsData.find(p => p.id === playlistId);

    const {user,token,setUser,setToken}=useStateContext() 
  useEffect(() => {
    axiosClient.get('/user')
        .then(({data}) => {
          setUser(data)
        })
    }, [])
    if (!selectedPlaylist) {
        return (
            <div className='min-h-screen bg-[#eae7b1] p-4 md:p-8 flex flex-col items-center justify-center pt-24'>
                <p className="text-2xl text-[#3c6255] mb-4">Playlist "{playlistId}" tidak ditemukan.</p>
                <Link to="/playlist" className='bg-[#3c6255] text-[#eae7b1] px-6 py-2 rounded-md flex items-center hover:opacity-90'>
                    <i className="ri-arrow-left-wide-fill mr-2"></i>
                    Kembali ke Daftar Playlist
                </Link>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-[#eae7b1] p-4 md:p-8 pt-24'>
            <div className="container mx-auto">
                <div className="mb-8 ml-8 mr-8">
                    <p className="text-3xl md:text-4xl font-bold text-left text-[#3c6255] mb-2">{selectedPlaylist.title}</p>
                    <hr className="border-t-2 border-[#3c6255]" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                    {selectedPlaylist.episodes.map((episode) => (
                        <PlaylistItem
                            key={episode.id}
                            title={episode.episodeTitle || episode.title} 
                            channel={episode.podcastTitle || episode.channel} 
                            rating={episode.rating}
                            imageUrl={episode.image}
                            onTriggerConfirm={onTriggerConfirm}
                            episodeId={episode.id}
                            podcastId={episode.podcastId} 
                            channelId={episode.channelId} 
                        />
                    ))}
                </div>

                <div className="flex ml-8 mr-8 justify-start mt-8">
                    <Link to="/playlist" className='bg-[#3c6255] text-[#eae7b1] px-6 py-2 rounded-md flex items-center hover:opacity-90'>
                        <i className="ri-arrow-left-wide-fill mr-2"></i>
                        Back
                    </Link>
                </div>
            </div>
        </div>
    );
};