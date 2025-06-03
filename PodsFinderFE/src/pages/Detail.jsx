import React, { useState, useEffect } from 'react'; 
import { useParams, Link, useLocation } from 'react-router-dom';
import { playlistsData } from '../data/playlistsData';
import { allPodcastsData, AvatarMichelle, PlaceholderImage } from '../data/podcastsData'; 
import { AddPlaylist } from '../components/AddPlaylist'; 

const EpisodeCard = ({ title, date, description }) => (
    <div className="w-full mb-8">
        <h3 className="text-lg font-semibold text-left text-[#3c6255] mb-1">
            {title}
        </h3>
        <p className="text-[15px] text-left text-[#3c6255] mb-2">
            {date}
        </p>
        <p className="text-base text-left text-[#3c6255]">
            {description}
        </p>
    </div>
);

const ReviewCard = ({ avatarSrc, name, handle, reviewText }) => (
    <div className="w-full p-6 bg-[#a6bb8d]/80 rounded-md overflow-hidden mb-6 flex flex-col">
        <div className="flex items-center mb-4">
            <div className="w-[50px] h-[50px] rounded-full overflow-hidden mr-4">
                <img src={avatarSrc} alt={`${name} Avatar`} className="w-full h-full object-cover"/>
            </div>
            <div>
                <p className="text-lg font-semibold text-left text-[#3c6255]">{name}</p>
                <p className="text-base text-left text-[#3c6255]">{handle}</p>
            </div>
        </div>
        <p className="text-base text-left text-[#3c6255]">"{reviewText}"</p>
    </div>
);

const RelatedPodcastCard = ({ id, title, channel, coverSrc, rating, onAddToPlaylistClick }) => ( 
    <Link to={`/detail/${id}`} className="w-full bg-[#eae7b1] rounded-lg p-4 flex flex-col sm:flex-row items-start gap-4 shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded overflow-hidden">
            <img src={coverSrc || PlaceholderImage} alt="Podcast Cover" className="w-full h-full object-cover"/> 
        </div>
        <div className="flex-grow">
            <p className="text-sm text-left text-[#3c6255]">{channel}</p>
            <h4 className="text-base font-semibold text-left text-[#3c6255] mb-1">{title}</h4>
            <div className="flex items-center mb-3">
                <p className="text-base text-left text-[#3c6255] mr-1">{rating}</p>
                <span className="text-[#3c6255] text-lg">
                    <i className="ri-star-s-fill"></i>
                </span>
            </div>
            <div className="flex gap-2 mt-auto">
                <button
                    className="flex items-center px-3 py-1 bg-[#3c6255] rounded-md shadow-md text-[#eae7b1] text-sm"
                    onClick={(e) => {
                        e.preventDefault(); 
                        onAddToPlaylistClick(id); 
                    }}
                >
                    <span className="text-base mr-1"><i className="ri-heart-3-fill"></i></span>
                    Playlist
                </button>
                <button className="flex items-center px-3 py-1 bg-[#3c6255] rounded-md shadow-md text-[#eae7b1] text-sm">
                    <span className="text-base mr-1"><i className="ri-edit-2-line"></i></span>
                    Review
                </button>
            </div>
        </div>
    </Link>
);


export const Detail = () => {
    const { podcastId } = useParams();
    const location = useLocation();
    const selectedPodcast = allPodcastsData.find(podcast => podcast.id === podcastId);

    const [isAddPlaylistPopupOpen, setIsAddPlaylistPopupOpen] = useState(false);
    const [podcastToAddId, setPodcastToAddId] = useState(null); 

    const handleOpenAddPlaylistPopup = (id) => {
        setPodcastToAddId(id);
        setIsAddPlaylistPopupOpen(true);
    };

    const handleCloseAddPlaylistPopup = () => {
        setIsAddPlaylistPopupOpen(false);
        setPodcastToAddId(null);
    };

    const handleAddToPlaylist = (playlistId) => {
        const podcastToAddToPlaylist = allPodcastsData.find(p => p.id === podcastToAddId);
        if (podcastToAddToPlaylist) {
            const targetPlaylist = playlistsData.find(p => p.id === playlistId);
            if (targetPlaylist) {
                const episodeExists = targetPlaylist.episodes.some(ep => ep.id === podcastToAddToPlaylist.id);
                if (!episodeExists) {
                    targetPlaylist.episodes.push({
                        id: podcastToAddToPlaylist.id,
                        image: podcastToAddToPlaylist.image || PlaceholderImage, 
                        podcastTitle: podcastToAddToPlaylist.channel, 
                        episodeTitle: podcastToAddToPlaylist.title, 
                        rating: podcastToAddToPlaylist.rating
                    });
                    console.log(`Podcast "${podcastToAddToPlaylist.title}" berhasil ditambahkan ke "${targetPlaylist.title}"`);
                } else {
                    console.log(`Podcast "${podcastToAddToPlaylist.title}" sudah ada di "${targetPlaylist.title}"`);
                }
            }
        }
        handleCloseAddPlaylistPopup(); 
    };

    useEffect(() => {
        if (location.hash) { 
            const element = document.getElementById(location.hash.substring(1)); 
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' }); 
                element.focus(); 
            }
        }
    }, [location]);

    if (!selectedPodcast) {
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

                <section className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
                    <div className="relative w-full md:w-2/5 flex justify-center items-center">
                        <img src={selectedPodcast.image} alt={`${selectedPodcast.title} Background`} className="w-full h-auto max-h-[350px] object-cover rounded-lg opacity-50"/>
                        <img src={selectedPodcast.image} alt={`${selectedPodcast.title} Cover`} className="absolute inset-0 m-auto w-3/5 md:w-3/4 max-w-[173px] h-auto object-cover rounded-lg shadow-lg"/>
                    </div>

                    <div className="w-full md:w-3/5 text-center md:text-left">
                        <Link to={`/detailchannel/${selectedPodcast.channelId}`} className='text-xl text-[#3c6255] mb-2 hover:underline'>
                            <p>{selectedPodcast.channel}</p>
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-semibold text-[#3c6255] mb-4">{selectedPodcast.title}</h1>
                        <div className="flex items-center justify-center md:justify-start mb-4">
                            <p className="text-4xl text-[#3c6255] mr-2">{selectedPodcast.rating}</p>
                            <span className="text-4xl text-[#3c6255]">
                                <i className="ri-star-s-fill"></i>
                            </span>
                        </div>
                        <p className="text-base text-[#3c6255] leading-relaxed">
                            {selectedPodcast.description}
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-6">
                            <div className="bg-transparent border-2 border-[#3c6255] rounded-md px-6 py-2 text-[#3c6255] flex items-center justify-center hover:bg-[#d0c69d] transition-colors duration-300 text-base"
                            onClick={() => { 
                                const targetInput = document.getElementById('add-review-input');
                                if (targetInput) {
                                  targetInput.scrollIntoView({ behavior: 'smooth', block: 'center' }); 
                                  targetInput.focus(); 
                                }
                              }}
                            
                            >
                                <i className="ri-edit-2-line mr-2"></i> Review
                            </div>
                            <button
                                className="bg-transparent border-2 border-[#3c6255] rounded-md px-6 py-2 text-[#3c6255] flex items-center justify-center hover:bg-[#d0c69d] transition-colors duration-300 text-base"
                                onClick={() => handleOpenAddPlaylistPopup(selectedPodcast.id)}
                            >
                                <i className="ri-heart-3-fill mr-2"></i> Playlist
                            </button>
                        </div>
                    </div>
                </section>

                <div className="w-full border-b-2 border-[#3C6255] my-12"></div>

                <section className="mb-12">
                    <h2 className="text-3xl font-semibold text-left text-[#3c6255] mb-6">
                        Latest Episodes
                    </h2>
                    <div className="flex flex-col space-y-8">
                        {selectedPodcast.episodes.map((episode, index) => (
                            <EpisodeCard
                                key={index}
                                title={episode.title}
                                date={episode.date}
                                description={episode.description}
                            />
                        ))}
                    </div>
                </section>

                <div className="w-full border-b-2 border-[#3C6255] my-12"></div>

                <section id="review-section" className="mb-12">
                    <div className="w-full p-6 bg-[#a6bb8d]/50 rounded-md overflow-hidden mb-6 flex items-center">
                        <div className="w-[70px] h-[70px] rounded-full overflow-hidden mr-4">
                            <img src={AvatarMichelle} alt="User Avatar" className="w-full h-full object-cover"/>
                        </div>
                        <input
                            id="add-review-input"
                            className="flex-grow text-base text-left text-[#3c6255]/90 p-2 rounded-md bg-transparent border-none focus:outline-none"
                            placeholder='Add a review...'
                        />
                    </div>

                    <div className="flex flex-col">
                        {selectedPodcast.reviews.length > 0 ? (
                            selectedPodcast.reviews.map((review, index) => (
                                <ReviewCard
                                    key={index}
                                    avatarSrc={review.avatarSrc}
                                    name={review.name}
                                    handle={review.handle}
                                    reviewText={review.reviewText}
                                />
                            ))
                        ) : (
                            <p className="text-base text-left text-[#3c6255]">Belum ada review untuk podcast ini.</p>
                        )}
                    </div>
                </section>

                <div className="w-full border-b-2 border-[#3C6255] my-12"></div>

                <section className="mb-12">
                    <div className="flex justify-between items-end mb-6">
                        <h2 className="text-2xl font-semibold text-left text-[#3c6255]">
                            Related podcast
                        </h2>
                        <button className="flex items-center text-base text-[#3c6255] hover:text-[#3c6255]/80">
                            View all
                            <span className="text-lg rotate-180 ml-2">
                                <i className="ri-arrow-left-wide-fill"></i>
                            </span>
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {selectedPodcast.relatedPodcasts.length > 0 ? (
                            selectedPodcast.relatedPodcasts.map((related, index) => (
                                <RelatedPodcastCard
                                    key={index}
                                    id={related.id}
                                    title={related.title}
                                    channel={related.channel}
                                    coverSrc={related.coverSrc}
                                    rating={related.rating}
                                    onAddToPlaylistClick={handleOpenAddPlaylistPopup} 
                                />
                            ))
                        ) : (
                            <p className="text-base text-left text-[#3c6255]">Tidak ada podcast terkait.</p>
                        )}
                    </div>
                </section>

                <div className="w-full border-b-2 border-[#3C6255] my-12"></div>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-left text-[#3c6255] mb-6">
                        Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-[#eae7b1] rounded-lg p-4 shadow-md">
                            <p className="text-xs text-left text-[#3c6255] mb-1">Channel</p>
                            <p className="text-base font-semibold text-left text-[#3c6255] mb-4">{selectedPodcast.info.channelName}</p>

                            <p className="text-xs text-left text-[#3c6255] mb-1">Creator</p>
                            <p className="text-base font-semibold text-left text-[#3c6255] mb-4">{selectedPodcast.info.creator}</p>

                            <p className="text-xs text-left text-[#3c6255] mb-1">Show-Web</p>
                            <p className="text-base font-semibold text-left text-[#3c6255]">{selectedPodcast.info.showWeb}</p>
                        </div>

                        <div className="bg-[#eae7b1] rounded-lg p-4 shadow-md">
                            <p className="text-xs text-left text-[#3c6255] mb-1">Years Active</p>
                            <p className="text-base font-semibold text-left text-[#3c6255] mb-4">{selectedPodcast.info.yearsActive}</p>

                            <p className="text-xs text-left text-[#3c6255] mb-1">Episodes</p>
                            <p className="text-base font-semibold text-left text-[#3c6255] mb-4">{selectedPodcast.info.totalEpisodes}</p>

                            <p className="text-xs text-left text-[#3c6255] mb-1">Genre</p>
                            <p className="text-base font-semibold text-left text-[#3c6255]">{selectedPodcast.info.genre}</p>
                        </div>

                        <div className="bg-[#eae7b1] rounded-lg p-4 shadow-md">
                            <p className="text-xs text-left text-[#3c6255] mb-1">License</p>
                            <p className="text-base font-semibold text-left text-[#3c6255] mb-4">{selectedPodcast.info.license}</p>

                            <p className="text-xs text-left text-[#3c6255] mb-1">Copyright</p>
                            <p className="text-base font-semibold text-left text-[#3c6255] mb-4">{selectedPodcast.info.copyright}</p>
                        </div>
                    </div>
                </section>

                <div className="w-full flex justify-start mt-8">
                    <Link to="/genre" className="flex items-center px-4 py-2 bg-[#3c6255] rounded-md shadow-md text-[#eae7b1] text-base hover:opacity-90">
                        <span className="text-lg mr-2">
                            <i className="ri-arrow-left-wide-fill"></i>
                        </span>
                        Back to Genre
                    </Link>
                </div>
            </div>

            <AddPlaylist
                isOpen={isAddPlaylistPopupOpen}
                onClose={handleCloseAddPlaylistPopup}
                playlists={playlistsData} 
                onAddToPlaylist={handleAddToPlaylist} 
            />
        </div>
    );
};