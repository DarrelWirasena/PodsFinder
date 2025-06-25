import React from 'react';

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

export default EpisodeCard;
