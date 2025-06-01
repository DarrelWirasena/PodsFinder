import React from 'react';
export const SearchOverlay = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4">
      <div
        className="absolute inset-0 bg-[#a6bb8d]/60 backdrop-blur-sm" 
        onClick={onClose} 
      />

      <div className="relative z-10 w-[650px] mt-10 p-4 rounded-md bg-[#3c6255] opacity-90 shadow-lg">
        <label htmlFor="search-input" className="block text-2xl text-center text-[#eae7b1] mb-2">
          <input
            id="search-input"
            className="w-full px-4 py-2 rounded-md bg-white/20 text-[#eae7b1] placeholder-[#eae7b1] focus:outline-none focus:ring-2 focus:ring-[#eae7b1] text-lg"
            placeholder="Search topic, genre, podcast..."
          />
        </label>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-[#eae7b1] hover:text-white text-3xl font-bold"
        >
          &times; 
        </button>
      </div>
    </div>
  );
};