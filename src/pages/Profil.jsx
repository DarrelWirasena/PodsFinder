// import React from 'react';
// import { Link } from 'react-router-dom';

// import Profil from '../assets/images/michelle.jpg';
// import Pod1 from '../assets/images/Armuh.png'; 
// import Berizik from '../assets/images/Berizik.png'; 

// const UserProfile = ({ profileImage, username, handle }) => (
//   <div className="flex items-center">
//     <img src={profileImage} alt="Profile" className="w-15 h-15 rounded-full mr-4 object-cover" />
//     <div>
//       <p className="text-xl font-semibold text-[#3c6255]">{username}</p>
//       <p className="text-lg text-[#3c6255]">@{handle}</p>
//     </div>
//   </div>
// );

// const PlaylistCard = ({ title, podcastImages }) => (
//   <div className="bg-[#3c6255] p-2 w-auto h-auto rounded-lg shadow-md">
//     <h2 className='text-2xl font-semibold text-[#eae7b1] mb-4'>{title}</h2>
//     <div className="flex flex-wrap gap-2 mb-4 justify-center">
//       {podcastImages.slice(0, 4).map((image, index) => (
//         <img key={index} src={image} alt={`Podcast ${index + 1}`} className="w-34 h-34 rounded object-cover aspect-square" />
//       ))}
//     </div>
//   </div>
// );

// const EpisodeCard = ({ image, podcastTitle, episodeTitle, rating }) => (
//   <div className="flex items-center mb-6 p-4 border border-[#3c6255] rounded-lg shadow-sm bg-[#EAE7B1]">
//     <img src={image} alt="Episode Cover" className="w-28 h-28 rounded object-cover mr-4 flex-shrink-0" />
//     <div>
//       <p className="text-base text-[#3c6255]">{podcastTitle}</p>
//       <h3 className="text-lg font-semibold text-[#3c6255] mb-1">{episodeTitle}</h3>
//       <div className="flex items-center text-[#3c6255]">
//         <i className="ri-star-s-fill mr-1"></i>
//         <p>{rating}</p>
//       </div>
//     </div>
//   </div>
// );

// export const Playlist = () => {
//   const currentUser = {
//     profileImage: Profil,
//     username: 'Michelle',
//     handle: 'celow',
//   };

//   const playlistsData = [
//     {
//       id: 1,
//       title: 'Playlist 1',
//       images: [Pod1, Pod1, Pod1, Pod1],
//     },
//     {
//       id: 2,
//       title: 'Playlist 2',
//       images: [Pod1, Pod1, Pod1, Pod1],
//     },
//     {
//       id: 3,
//       title: 'Playlist 3',
//       images: [Pod1, Pod1, Pod1, Pod1],
//     },
//     {
//       id: 4,
//       title: 'Playlist 4',
//       images: [Pod1, Pod1, Pod1, Pod1],
//     },
//   ];

//   const episodesData = [
//     {
//       id: 1,
//       image: Berizik,
//       podcastTitle: 'BERIZIK',
//       episodeTitle: 'EP29: Last Playlist Berizik',
//       rating: '4.5',
//     },
//     {
//       id: 2,
//       image: Berizik,
//       podcastTitle: 'BERIZIK',
//       episodeTitle: 'EP29: Last Playlist Berizik',
//       rating: '4.5',
//     },
//     {
//       id: 3,
//       image: Berizik,
//       podcastTitle: 'BERIZIK',
//       episodeTitle: 'EP29: Last Playlist Berizik',
//       rating: '4.5',
//     },
//   ];

//   return (
//     <div className='min-h-screen bg-[#eae7b1] p-4 md:p-8'>
//       <div className="max-w-screen-xl mx-auto px-4">
//         <div className='flex justify-between items-start mb-10'>
//           <UserProfile
//             profileImage={currentUser.profileImage}
//             username={currentUser.username}
//             handle={currentUser.handle}
//           />
//           <Link to="/previewsaja">
//             <button className='bg-[#3c6255] text-[#eae7b1] px-4 py-2 rounded-md hover:opacity-90'>
//               Log out
//             </button>
//           </Link>
//         </div>

//         <hr className="border-t-2 border-[#3c6255] my-6" />

//         <h2 className="text-2xl font-bold text-[#3c6255] mb-6">Daftar Playlist</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
//           {playlistsData.map((playlist) => (
//             <PlaylistCard
//               key={playlist.id}
//               title={playlist.title}
//               podcastImages={playlist.images}
//             />
//           ))}
//         </div>

//         <h2 className="text-2xl font-bold text-[#3c6255] mb-6">Daftar Episode</h2>
//         <hr className="border-t-2 border-[#3c6255] my-8" />

//         <div className="flex flex-col gap-4">
//           {episodesData.map((episode) => (
//             <EpisodeCard
//               key={episode.id}
//               image={episode.image}
//               podcastTitle={episode.podcastTitle}
//               episodeTitle={episode.episodeTitle}
//               rating={episode.rating}
//             />
//           ))}
//         </div>

//         <div className="flex justify-start mt-8">
//           <button className='bg-[#3c6255] ri-arrow-left-wide-fill text-[#eae7b1] px-6 py-2 rounded-md flex items-center hover:opacity-90'>
//             Back
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };