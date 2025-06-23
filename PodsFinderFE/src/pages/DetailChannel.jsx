import React, { useEffect, useState } from 'react';
import axiosClient from '../axios-client';
import { useParams, Link } from 'react-router-dom';
import { allChannelsData, allPodcastsData, PlaceholderImage } from '../data/podcastsData'; 
import { useStateContext } from '../contexts/ContextsPorvider';

const BackButton = () => (
  <Link to="/genre" className="flex items-center px-4 py-2 bg-[#3c6255] rounded-md shadow-md text-[#eae7b1] text-base hover:bg-[#3c6255]/90 transition-colors">
    <span className="text-lg mr-2">
        <i className="ri-arrow-left-wide-fill"></i>
    </span>
    Back to Genre
  </Link>
);

const ChannelHeader = ({ bannerSrc, avatarSrc, channelName, creatorName, rating }) => (
  <div className="relative w-full h-[250px] md:h-[400px] overflow-hidden rounded-lg mb-8">
    <img
      src={bannerSrc}
      alt="Channel Banner"
      className="w-full h-full object-cover border border-black"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 md:p-8">
      <div className="flex items-end mb-4">
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg flex-shrink-0 mr-4">
          <img
            src={avatarSrc}
            alt="Channel Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-3xl md:text-5xl font-semibold text-white mb-1">
            {channelName}
          </h1>
          <p className="text-lg md:text-xl text-white opacity-90 mb-2">
            {creatorName}
          </p>
          <div className="flex items-center text-white">
            <p className="text-2xl mr-1">{rating}</p>
            <span className="text-2xl">
              <i className="ri-star-s-fill"></i>
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
      </div>
    </div>
  </div>
);

const ChannelPodcastCard = ({ id, coverSrc, title, rating }) => (
  <Link to={`/detail/${id}`} className="bg-[#eae7b1] rounded-lg shadow-md overflow-hidden p-4 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300">
    <img
      src={coverSrc || PlaceholderImage} 
      alt="Podcast Cover"
      className="w-full h-40 md:h-48 object-cover rounded-md mb-4"
    />
    <h3 className="text-base font-semibold text-[#3c6255] mb-1">
      {title}
    </h3>
    <div className="flex items-center text-[#3c6255]">
      <p className="text-base mr-1">{rating}</p>
      <span className="text-base">
        <i className="ri-star-s-fill"></i>
      </span>
    </div>
  </Link>
);

export const DetailChannel = () => {
  const { channelId } = useParams();

  const selectedChannel = allChannelsData.find(channel => channel.id === channelId);

  const {user,token,setUser,setToken}=useStateContext() 
  useEffect(() => {
    axiosClient.get('/user')
        .then(({data}) => {
          setUser(data)
        })
    }, [])

  if (!selectedChannel) {
    return (
      <div className="min-h-screen bg-[#eae7b1] p-4 md:p-8 flex flex-col items-center justify-center pt-24">
        <p className="text-2xl text-[#3c6255] mb-4">Channel "{channelId}" tidak ditemukan.</p>
        <Link to="/genre" className='bg-[#3c6255] text-[#eae7b1] px-6 py-2 rounded-md flex items-center hover:opacity-90'>
            <i className="ri-arrow-left-wide-fill mr-2"></i>
            Kembali ke Genre
        </Link>
      </div>
    );
  }

  const channelPodcasts = allPodcastsData.filter(podcast =>
    selectedChannel.podcastIds.includes(podcast.id)
  );

  return (
    <div className="min-h-screen bg-[#eae7b1] pt-24 px-4 py-8">
      <div className="max-w-screen-lg mx-auto">

        <ChannelHeader
          bannerSrc={selectedChannel.coverImage || PlaceholderImage}
          avatarSrc={selectedChannel.coverImage || PlaceholderImage} 
          channelName={selectedChannel.name} 
          creatorName={selectedChannel.creator} 
          rating={selectedChannel.subscribers} 
        />

        <div className="w-full border-b-2 border-[#3C6255] my-12"></div>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-left text-[#3c6255] mb-4">
            About
          </h2>
          <div className="bg-[#a6bb8d]/60 rounded-lg p-6 shadow-sm">
            <p className="text-base text-left text-[#3c6255] leading-relaxed">
              {selectedChannel.description}
            </p>
          </div>
        </section>

        <div className="w-full border-b-2 border-[#3C6255] my-12"></div>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-left text-[#3c6255] mb-6">
            Latest Episodes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {channelPodcasts.length > 0 ? (
                channelPodcasts.map((podcast) => ( 
                    <ChannelPodcastCard
                        key={podcast.id} 
                        id={podcast.id}
                        coverSrc={podcast.coverImage} 
                        title={podcast.title}
                        rating={podcast.rating}
                    />
                ))
            ) : (
                <p className="text-base text-left text-[#3c6255]">Tidak ada podcast ditemukan untuk channel ini.</p>
            )}
          </div>
        </section>

        <div className="w-full border-b-2 border-[#3C6255] my-12"></div>

        <div className="mb-8 flex justify-start">
          <BackButton />
        </div>
      </div>
    </div>
  );
};