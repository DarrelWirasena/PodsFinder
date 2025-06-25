import React, { useEffect, useState } from 'react'; 
import { Link, Navigate } from 'react-router-dom';
import ProfileImageDefault from '../assets/images/michelle.jpg'; 
import { PlaceholderImage } from '../data/podcastsData';
import { dataReviewed } from '../data/dataReviewed';
import { playlistsData } from '../data/playlistsData';
import EditProfil from '../components/EditProfil';
import axiosClient from '../axios-client';
import {useStateContext } from '../contexts/ContextsPorvider';

const UserProfile = ({ profileImage, username, handle, onClick }) => (
  <div
    className="flex items-center cursor-pointer hover:opacity-80 transition-opacity duration-200"
    onClick={onClick} 
  >
    <img src={profileImage} alt="Profile" className="w-15 h-15 rounded-full mr-4 object-cover" />
    <div>
      <p className="text-xl font-semibold text-[#3c6255]">{username}</p>
      <p className="text-lg text-[#3c6255]">@{handle}</p>
    </div>
  </div>
);

const PlaylistCard = ({ playlist }) => (
  <Link to={`/playlistviewall/${playlist.id}`} className="block bg-[#3c6255] p-2 w-auto h-auto rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <h2 className='text-2xl font-semibold text-[#eae7b1] mb-4'>{playlist.title}</h2>
    <div className="flex flex-wrap gap-2 mb-4 justify-center">
      {playlist.episodes.slice(0, 4).map((episode, index) => (
        <img
          key={index}
          src={episode.image || PlaceholderImage}
          alt={`Podcast ${index + 1}`}
          className="w-34 h-34 rounded object-cover aspect-square"
        />
      ))}
    </div>
  </Link>
);

const EpisodeCard = ({ podcast }) => (
  <Link to={`/detail/${podcast.id}`} className="block">
    <div className="flex items-center mb-6 p-4 border border-[#3c6255] rounded-lg shadow-sm bg-[#EAE7B1] hover:shadow-md transition-shadow duration-300">
      <img
        src={podcast.image || PlaceholderImage}
        alt={podcast.title}
        className="w-28 h-28 rounded object-cover mr-4 flex-shrink-0"
      />
      <div>
        <p className="text-base text-[#3c6255]">{podcast.podcastTitle || podcast.title}</p>
        <h3 className="text-lg font-semibold text-[#3c6255] mb-1">{podcast.episodeTitle || podcast.episode}</h3>
        <div className="flex items-center text-[#3c6255]">
          <i className="ri-star-s-fill mr-1"></i>
          <p>{podcast.rating}</p>
        </div>
        {podcast.channelId && podcast.channelName && (
          <Link
            to={`/detailchannel/${podcast.channelId}`}
            className="text-sm text-[#3c6255] mt-2 hover:underline hover:text-[#2c4f43] transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            Channel: {podcast.channelName} <i className="ri-share-box-line ml-1"></i>
          </Link>
        )}
      </div>
    </div>
  </Link>
);

export const Profil = () => {
  const [currentUser, setCurrentUser] = useState({
    profileImage: ProfileImageDefault, 
    username: 'Michelle',
    handle: 'celow',
  });

  const [isEditOpen, setIsEditOpen] = useState(false);
  const handleSaveProfile = ({ username, profileImage }) => {
    setCurrentUser(prevUser => ({
      ...prevUser,
      username: username,
      profileImage: profileImage,
    }));
  };
  const {user,token,setUser,setToken}=useStateContext()
  const playlistsToDisplay = playlistsData.slice(0, 4);
  const reviewedPodcastsToDisplay = dataReviewed.slice(0, 3);

  const onLogout = ev => {
    ev.preventDefault()

    axiosClient.post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
      })
  }

 useEffect(() => {
    axiosClient.get('/user')
      .then(({data}) => {
         setUser(data)
      })
  }, [])

  if(!token){
    return<Navigate to="/"/>
  }
  return (
    <div className='min-h-screen bg-[#eae7b1] p-4 md:p-8 pt-24'>
      <div className="max-w-screen-xl mx-auto px-4">
        <div className='flex justify-between items-start mb-10'>
          <UserProfile
            profileImage={currentUser.profileImage}
            username={user.name}
            handle={currentUser.handle}
            onClick={() => setIsEditOpen(true)} 
          />
          
            <button onClick={onLogout}className='bg-[#3c6255] text-[#eae7b1] px-4 py-2 rounded-md hover:opacity-90'>
              Log out
            </button>
          
        </div>

        <hr className="border-t-2 border-[#3c6255] my-6" />

        <h2 className="text-2xl font-bold text-[#3c6255] mb-6">Daftar Playlist</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {playlistsToDisplay.map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              playlist={playlist}
            />
          ))}
        </div>

        <h2 className="text-2xl font-bold text-[#3c6255] mb-6">Already Reviewed</h2>
        <hr className="border-t-2 border-[#3c6255] my-8" />

        <div className="flex flex-col gap-4">
          {reviewedPodcastsToDisplay.map((podcast) => (
            <EpisodeCard
              key={podcast.id}
              podcast={podcast}
            />
          ))}
        </div>

        <div className="flex justify-start mt-8">
          <Link to="/" className='bg-[#3c6255] ri-arrow-left-wide-fill text-[#eae7b1] px-6 py-2 rounded-md flex items-center hover:opacity-90'>
            Back
          </Link>
        </div>
      </div>

      <EditProfil
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        currentUsername={currentUser.username}
        onSave={handleSaveProfile}
      />
    </div>
  );
};