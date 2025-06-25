import React, { useState, useEffect } from 'react';

export const ReviewCard = ({
    id,
    avatarSrc,
    name,
    email,
    reviewText,
    rating,
    onDelete,
    onEdit,
    reviewUserId,
    currentUserId,
    isEditing,
    onSaveEdit,
    onCancelEdit,
    isDeleting
}) => {
    const [editedReviewText, setEditedReviewText] = useState(reviewText);
    const [editedReviewRating, setEditedReviewRating] = useState(rating);

    useEffect(() => {
        setEditedReviewText(reviewText);
        setEditedReviewRating(rating);
    }, [reviewText, rating]);

    const renderStars = (numRating) => {
        const fullStars = Math.floor(numRating);
        const hasHalfStar = numRating % 1 !== 0;
        const stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push(<i key={`full-${id}-${i}`} className="ri-star-s-fill text-yellow-500"></i>);
        }
        if (hasHalfStar) {
            stars.push(<i key={`half-${id}`} className="ri-star-half-s-fill text-yellow-500"></i>);
        }
        const emptyStars = 5 - stars.length;
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<i key={`empty-${id}-${i}`} className="ri-star-s-fill text-gray-400"></i>);
        }
        return stars;
    };

    return (
        <div className="relative w-full p-6 bg-[#a6bb8d]/80 rounded-md overflow-hidden mb-6 flex flex-col">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center">
                    <div className="w-[50px] h-[50px] rounded-full overflow-hidden mr-4">
                        <img src={avatarSrc} alt={`${name} Avatar`} className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <p className="text-lg font-semibold text-left text-[#3c6255]">{name}</p>
                        <p className="text-base text-left text-[#3c6255]">{email}</p>
                    </div>
                </div>

                {isEditing ? (
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <div className="flex items-center text-[#3c6255]">
                            <i className="ri-star-s-fill text-yellow-500 text-lg mr-1"></i>
                            <select
                                className="px-2 py-1 bg-[#3c6255] rounded-md text-[#eae7b1] cursor-pointer appearance-none pr-6 hover:bg-[#2c4f43] transition-colors text-base"
                                value={editedReviewRating}
                                onChange={(e) => setEditedReviewRating(e.target.value)}
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
                        </div>
                        <button
                            onClick={() => onSaveEdit(id, editedReviewText, editedReviewRating)}
                            className="text-xl text-[#3c6255] cursor-pointer hover:text-green-600 transition-colors"
                            aria-label="Simpan perubahan review"
                        >
                            <i className="ri-save-line"></i>
                        </button>
                        <button
                            onClick={onCancelEdit}
                            className="text-xl text-[#3c6255] cursor-pointer hover:text-gray-600 transition-colors"
                            aria-label="Batalkan edit review"
                        >
                            <i className="ri-close-circle-line"></i>
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 flex-shrink-0">
                        {rating && (
                            <div className="flex items-center text-[#3c6255] flex-shrink-0">
                                <p className="text-lg font-bold mr-1">{parseInt(rating)}</p>
                                <div className="hidden sm:flex text-lg">
                                    {renderStars(parseFloat(rating))}
                                </div>
                            </div>
                        )}
                        {reviewUserId === currentUserId && (
                            <>
                                <button
                                    onClick={() => onEdit(id, reviewText, rating)}
                                    className="text-xl text-[#3c6255] cursor-pointer hover:text-blue-500 transition-colors"
                                    aria-label={`Edit review dari ${name}`}
                                >
                                    <i className="ri-edit-line"></i>
                                </button>
                                <button
                                    onClick={() => onDelete(id)}
                                    disabled={isDeleting}
                                    className={`text-xl text-[#3c6255] cursor-pointer hover:text-red-500 transition-colors ${
                                        isDeleting ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                    aria-label={`Hapus review dari ${name}`}
                                    >
                                    {isDeleting ? (
                                        <i className="ri-loader-4-line animate-spin"></i> // ikon loading
                                    ) : (
                                        <i className="ri-delete-bin-fill"></i>
                                    )}
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>

            {isEditing ? (
                <textarea
                    className="w-full p-2 rounded-md bg-[#eae7b1] text-base text-[#3c6255] border border-[#3c6255] focus:outline-none focus:border-[#2c4f43] resize-y mb-2"
                    value={editedReviewText}
                    onChange={(e) => setEditedReviewText(e.target.value)}
                    rows="3"
                />
            ) : (
                <p className="text-base text-left text-[#3c6255] line-clamp-2 overflow-hidden break-words">
                    {reviewText}
                </p>
            )}
        </div>
    );
};

export default ReviewCard;
