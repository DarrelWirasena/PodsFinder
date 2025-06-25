
import React from 'react';

export const AddPlaylist = ({ isOpen, onClose, playlists, onAddToPlaylist }) => {
  if (!isOpen) return null; 
  return (
    <div className="fixed inset-0 bg-[#a6bb8d]/40 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#eae7b1] p-6 rounded-lg shadow-xl w-80 max-w-sm border border-[#3c6255]">
        <h3 className="text-xl font-bold text-[#3c6255] mb-4 text-center">Tambahkan ke Playlist</h3>
        <div className="space-y-3 max-h-60 overflow-y-auto">
          {playlists.length > 0 ? (
            playlists.map((playlist) => (
              <button
                key={playlist.id}
                className="w-full text-left p-3 rounded-md bg-[#3c6255] text-[#eae7b1] hover:bg-[#2c4f43] transition-colors duration-200"
                onClick={() => onAddToPlaylist(playlist.id)}
              >
                {playlist.name}
              </button>
            ))
          ) : (
            <p className="text-[#3c6255] text-center">Tidak ada playlist ditemukan.</p>
          )}
        </div>
        <div className="flex justify-end mt-6">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
            onClick={onClose}
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};