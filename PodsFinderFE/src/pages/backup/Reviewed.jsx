import React, { useEffect, useState } from 'react';
import axiosClient from '../axios-client';
import { Link, Navigate } from 'react-router-dom';
import { dataReviewed } from '../data/dataReviewed'; 
import { useStateContext } from '../contexts/ContextsPorvider';

const ReviewedPodcastCard = ({ id, image, title, episode, rating, channelId, channelName }) => {
  const {user,token,setUser,setToken}=useStateContext() 
  useEffect(() => {
    axiosClient.get('/user')
        .then(({data}) => {
          setUser(data)
        })
    }, [])
  return (
    <Link to={`/detail/${id}`} className="block"> 
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 rounded-lg mb-4 bg-[#EAE7B1]/20 shadow-md hover:shadow-lg transition-shadow duration-300"> 
        <img
          src={image}
          alt={title}
          className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
        />
        <div className="flex flex-col justify-center text-center sm:text-left flex-grow">
          <p className="text-base font-semibold text-[#3c6255] mb-1">{title}</p>
          <p className="text-lg font-bold text-[#3c6255] mb-2">{episode}</p>
          <div className="flex items-center justify-center sm:justify-start mt-1">
            <p className="text-base text-[#3c6255]">{rating}</p>
            <i className="ri-star-s-fill text-[#3c6255] text-base ml-1"></i> 
          </div>
          {channelId && channelName && (
            <Link 
              to={`/detailchannel/${channelId}`} 
              className="text-sm text-[#3c6255] mt-2 hover:underline hover:text-[#2c4f43] transition-colors"
              onClick={(e) => e.stopPropagation()} 
            >
              Channel: {channelName} <i className="ri-share-box-line ml-1"></i>
            </Link>
          )}
        </div>
      </div>
    </Link>
  );
};

export const Reviewed = () => {
  const reviewedPodcasts = dataReviewed; 
  const {token} = useStateContext()
  if (!token){
    return <Navigate to="/login"/>
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-8 lg:px-12 pt-24">
      <div className="mb-6">
        <Link to="/previewsaja" className="inline-block">
          <p className="text-3xl font-bold text-[#3c6255] mb-2">
            Already Reviewed
          </p>
        </Link>
        <hr className="border-t-2 border-[#3c6255] w-full" />
      </div>

      <div className="flex flex-col gap-4"> 
        {reviewedPodcasts.map((podcast) => (
          <ReviewedPodcastCard
            key={podcast.id}
            id={podcast.id} 
            image={podcast.image}
            title={podcast.title}
            episode={podcast.episode}
            rating={podcast.rating}
            channelId={podcast.channelId}
            channelName={podcast.channelName}
          />
        ))}
      </div>
    </div>
  );
};