import React from 'react';
import { Link } from 'react-router-dom';
import { PlaceholderImage } from '../data/podcastsData';

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
        <button
          className="flex items-center px-3 py-1 bg-[#3c6255] rounded-md shadow-md text-[#eae7b1] text-sm"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('add-review-input')?.focus();
            document.getElementById('add-review-input')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }}
        >
          <span className="text-base mr-1"><i className="ri-edit-2-line"></i></span>
          Review
        </button>
      </div>
    </div>
  </Link>
);

export default RelatedPodcastCard;
