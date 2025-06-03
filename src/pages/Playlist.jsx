import React from "react";
import { Link } from 'react-router-dom';
import { playlistsData } from '../data/playlistsData'; 
import { PlaceholderImage } from '../data/podcastsData'; 

const PlaylistSectionHeader = ({ title, linkTo = '#' }) => (
    <div className="flex ml-8 justify-between items-center mb-4">
        <h2 className="text-2xl md:text-3xl font-medium text-left text-[#3c6255]">{title}</h2>
        <Link to={linkTo} className="flex items-center text-base text-[#3c6255] hover:underline">
            View all
            <i className="ri-arrow-right-double-line w-5 h-5 ml-1 flex items-center mr-8 justify-center"></i>
        </Link>
    </div>
);

const EpisodeItemCard = ({ image, channel, title, rating, onTriggerConfirm, episodeId, podcastId, channelId }) => (
        <div className="relative flex flex-col ml-8 mr-8 sm:flex-row items-start sm:items-center gap-4 p-4 bg-[#eae7b1] rounded-lg shadow-md">
            <img src={image || PlaceholderImage} alt="Episode Cover" className="w-28 h-28 rounded object-cover flex-shrink-0" />
            <div className="flex-grow">
            <Link to={`/detail/${podcastId}`} className="block">
                <p className="text-base text-[#3c6255] mb-1">{channel}</p>
                <h3 className="text-lg font-semibold text-[#3c6255] mb-2">{title}</h3>
                <div className="flex items-center text-[#3c6255]">
                    <p className="text-base leading-none">{rating}</p>
                    <i className="ri-star-s-fill text-base leading-none ml-1"></i>
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

export const Playlist = ({ onTriggerConfirm }) => {
    return (
        <div className='min-h-screen bg-[#eae7b1] p-4 md:p-8 pt-24'>
            <div className="container mx-auto">
                <div className="mb-8 ml-8 mr-8">
                    <p className="text-[32px] font-bold text-left text-[#3c6255] mb-2">Playlists</p>
                    <hr className="border-t-2 border-[#3c6255]" />
                </div>

                <div className="space-y-12">
                    {playlistsData.map((playlist) => (
                        <div key={playlist.id}>
                            <PlaylistSectionHeader
                                title={playlist.title}
                                linkTo={`/playlistviewall/${playlist.id}`}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {playlist.episodes.slice(0, 2).map((episode) => (
                                    <EpisodeItemCard
                                        key={episode.id}
                                        image={episode.image}
                                        channel={episode.channel}
                                        title={episode.title}
                                        rating={episode.rating}
                                        onTriggerConfirm={onTriggerConfirm}
                                        episodeId={episode.id}
                                        podcastId={episode.podcastId}
                                        channelId={episode.channelId}
                                    />
                                ))}
                            </div>
                            <hr className="ml-8 mr-8 border-t-2 border-[#3c6255] mt-8" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};