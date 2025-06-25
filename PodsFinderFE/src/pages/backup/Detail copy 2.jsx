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

export const Detail = () => {
    const { podcastId } = useParams();
    const location = useLocation();
    const selectedPodcast = allPodcastsData.find(podcast => podcast.id === podcastId);

    const currentUserId = 'user';
    const currentUserInfo = {
        id: currentUserId,
        name: 'userPods',
        handle: '@podssfinder',
        avatarSrc: AvatarMichelle,
    };

    const [reviews, setReviews] = useState([]);
    const [newReviewText, setNewReviewText] = useState('');
    const [newReviewRating, setNewReviewRating] = useState('5.0');
    const [editingReviewId, setEditingReviewId] = useState(null);

    const [isAddPlaylistPopupOpen, setIsAddPlaylistPopupOpen] = useState(false);
    const [podcastToAddId, setPodcastToAddId] = useState(null);

    useEffect(() => {
        if (selectedPodcast) {
            setReviews(selectedPodcast.reviews.map(review => ({
                ...review,
                id: review.id || Date.now().toString() + Math.random().toString().substring(2, 8),
                userId: review.userId || 'user-unknown',
                rating: review.rating || '5.0'
            })));
        }
    }, [selectedPodcast]);

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
                const episodeExists = targetPlaylist.episodes.some(ep => ep.podcastId === podcastToAddToPlaylist.id);
                if (!episodeExists) {
                    targetPlaylist.episodes.push({
                        id: podcastToAddToPlaylist.id,
                        image: podcastToAddToPlaylist.coverImage || PlaceholderImage,
                        podcastTitle: podcastToAddToPlaylist.channel,
                        episodeTitle: podcastToAddToPlaylist.title,
                        rating: podcastToAddToPlaylist.rating,
                        podcastId: podcastToAddToPlaylist.id,
                        channelId: podcastToAddToPlaylist.channelId,
                        channel: podcastToAddToPlaylist.channel,
                        title: podcastToAddToPlaylist.title
                    });
                    console.log(`Podcast "${podcastToAddToPlaylist.title}" berhasil ditambahkan ke "${targetPlaylist.title}"`);
                } else {
                    console.log(`Podcast "${podcastToAddToPlaylist.title}" sudah ada di "${targetPlaylist.title}"`);
                }
            }
        }
        handleCloseAddPlaylistPopup();
    };

    const hasUserReviewed = reviews.some(review => review.userId === currentUserId);

    const handleAddReview = () => {
        if (newReviewText.trim() === '') {
            alert('Review tidak boleh kosong!');
            return;
        }

        if (hasUserReviewed) {
            alert('Anda hanya dapat memberikan satu review untuk podcast ini.');
            return;
        }

        const newReview = {
            id: Date.now().toString() + Math.random().toString().substring(2, 8),
            avatarSrc: currentUserInfo.avatarSrc,
            name: currentUserInfo.name,
            handle: currentUserInfo.handle,
            userId: currentUserInfo.id,
            reviewText: newReviewText.trim(),
            rating: newReviewRating
        };

        setReviews([newReview, ...reviews]);
        setNewReviewText('');
        setNewReviewRating('5.0');
    };

    const handleDeleteReview = (reviewIdToDelete) => {
        const isConfirmed = window.confirm("Apakah Anda yakin ingin menghapus review ini?");
        if (isConfirmed) {
            setReviews(prevReviews => prevReviews.filter(review => review.id !== reviewIdToDelete));
            console.log(`Review dengan ID ${reviewIdToDelete} dihapus dari state.`);
        }
    };

    const handleEditReview = (idToEdit, currentText, currentRating) => {
        setEditingReviewId(idToEdit);
    };

    const handleSaveEditedReview = (idToSave, newText, newRating) => {
        if (newText.trim() === '') {
            alert('Review tidak boleh kosong setelah diedit!');
            return;
        }
        setReviews(prevReviews => prevReviews.map(review =>
            review.id === idToSave ? { ...review, reviewText: newText.trim(), rating: newRating } : review
        ));
        setEditingReviewId(null);
        console.log(`Review dengan ID ${idToSave} diperbarui.`);
    };

    const handleCancelEditReview = () => {
        setEditingReviewId(null);
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
                        <img src={selectedPodcast.coverImage || PlaceholderImage} alt={`${selectedPodcast.title} Background`} className="w-full h-auto max-h-[350px] object-cover rounded-lg opacity-50"/>
                        <img src={selectedPodcast.coverImage || PlaceholderImage} alt={`${selectedPodcast.title} Cover`} className="absolute inset-0 m-auto w-3/5 md:w-3/4 max-w-[173px] h-auto object-cover rounded-lg shadow-lg"/>
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
                            <button className="bg-transparent border-2 border-[#3c6255] rounded-md px-6 py-2 text-[#3c6255] flex items-center justify-center hover:bg-[#d0c69d] transition-colors duration-300 text-xl"
                                onClick={() => {
                                    const targetInput = document.getElementById('add-review-input');
                                    if (targetInput) {
                                        targetInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                        targetInput.focus();
                                    }
                                }}
                            >
                                <i className="ri-edit-2-line mr-2"></i> Review
                            </button>
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
                                key={episode.id || index}
                                title={episode.title}
                                date={episode.date}
                                description={episode.description}
                            />
                        ))}
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
                            selectedPodcast.relatedPodcasts.map((related) => (
                                <RelatedPodcastCard
                                    key={related.id}
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

                <section id="review-section" className="mb-12">
                    <h2 className="text-2xl font-semibold text-left text-[#3c6255] mb-6">Reviews</h2>
                    <div className="w-full p-6 bg-[#a6bb8d]/50 rounded-md overflow-hidden mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center flex-shrink-0 mb-4 sm:mb-0">
                            <div className="w-[70px] h-[70px] rounded-full overflow-hidden mr-4">
                                <img src={currentUserInfo.avatarSrc} alt="User Avatar" className="w-full h-full object-cover"/>
                            </div>
                        </div>

                        <input
                            id="add-review-input"
                            className="flex-grow text-base text-left text-[#3c6255]/90 p-2 rounded-md bg-transparent border-b-2 border-[#3c6255] focus:outline-none focus:border-[#2c4f43] transition-colors w-full"
                            placeholder='Tambahkan review...'
                            value={newReviewText}
                            onChange={(e) => setNewReviewText(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handleAddReview();
                                }
                            }}
                            disabled={hasUserReviewed} // --- Dinonaktifkan jika pengguna sudah me-review ---
                        />

                        <div className="flex-shrink-0 relative ml-4">
                        {/* <i className="ri-star-s-fill px-2 py-3 bg-[#3c6255] rounded-md text-[#eae7b1] appearance-none hover:bg-[#2c4f43] transition-colors"></i> */}
                        <i className="ri-star-s-fill text-2xl pr-2 text-yellow-500"></i>
                            <select
                                className="px-4 py-2 bg-[#3c6255] rounded-md text-[#eae7b1] cursor-pointer appearance-none pr-8 hover:bg-[#2c4f43] transition-colors"
                                value={newReviewRating}
                                onChange={(e) => setNewReviewRating(e.target.value)}
                                disabled={hasUserReviewed} 
                            >
                            
                                <option value="5.0">5.0</option>
                                <option value="4.5">4.5</option>
                                <option value="4.0">4.0</option>
                                <option value="3.5">3.5</option>
                                <option value="3.0">3.0</option>
                                <option value="2.5">2.5</option>
                                <option value="2.0">2.0</option>
                                <option value="1.5">1.5</option>
                                <option value="1.0">1.0</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#eae7b1]">
                                <i className="ri-arrow-down-s-fill"></i>
                            </div>
                        </div>

                        <button
                            onClick={handleAddReview}
                            className={`ml-4 px-6 py-2 rounded-md text-[#eae7b1] transition-colors flex-shrink-0
                                ${hasUserReviewed ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#3c6255] hover:bg-[#2c4f43]'}`}
                            disabled={hasUserReviewed} // --- Dinonaktifkan jika pengguna sudah me-review ---
                        >
                            Submit
                        </button>
                    </div>

                    {hasUserReviewed && (
                        <p className="text-base text-center text-[#3c6255] mt-2">
                            {/* Anda sudah memberikan review untuk podcast ini. */}
                        </p>
                    )}

                    <div className="flex flex-col">
                        {reviews.length > 0 ? (
                            reviews.map((review) => (
                                <ReviewCard
                                    key={review.id}
                                    id={review.id}
                                    avatarSrc={review.avatarSrc}
                                    name={review.name}
                                    handle={review.handle}
                                    reviewText={review.reviewText}
                                    rating={review.rating}
                                    onDelete={handleDeleteReview}
                                    onEdit={handleEditReview}
                                    onSaveEdit={handleSaveEditedReview}
                                    onCancelEdit={handleCancelEditReview}
                                    reviewUserId={review.userId}
                                    currentUserId={currentUserId}
                                    isEditing={editingReviewId === review.id}
                                />
                            ))
                        ) : (
                            <p className="text-base text-left text-[#3c6255]">Belum ada review untuk podcast ini.</p>
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
