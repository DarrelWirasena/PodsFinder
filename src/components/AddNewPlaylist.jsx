import React, { useState } from 'react'; 
import { PlaceholderImage } from '../data/podcastsData'; 

export const AddNewPlaylist = ({ isOpen, onClose, onCreateNewPlaylist }) => {
    const [playlistName, setPlaylistName] = useState('');
    const [playlistImage, setPlaylistImage] = useState(''); 

    if (!isOpen) return null;

    const handleCreate = () => {
        if (playlistName.trim() === '') {
            alert('Nama playlist tidak boleh kosong!');
            return;
        }
        onCreateNewPlaylist(playlistName, playlistImage);
        onClose(); 
    };

    return (
        <div className="fixed inset-0 bg-[#a6bb8d]/40 bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-[#eae7b1] p-6 rounded-lg shadow-xl w-full max-w-sm border border-[#3c6255] relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-[#3c6255] text-2xl hover:text-red-500 transition-colors"
                    aria-label="Tutup"
                >
                    <i className="ri-close-line"></i>
                </button>

                <h3 className="text-xl font-bold text-[#3c6255] mb-4 text-center">Buat Playlist Baru</h3>
                
                <div className="mb-6">
                    <div className="flex flex-col gap-3">
                        <label htmlFor="playlistName" className="block text-[#3c6255] text-base font-semibold">
                            Nama Playlist
                        </label>
                        <input
                            type="text"
                            id="playlistName"
                            placeholder="Nama Playlist Baru Anda" 
                            className="flex-grow p-2 rounded-md border border-[#3c6255] bg-white text-[#3c6255] focus:outline-none focus:ring-1 focus:ring-[#2c4f43]"
                            value={playlistName}
                            onChange={(e) => setPlaylistName(e.target.value)}
                        />
                    </div>

                  
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <button
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
                        onClick={onClose}
                    >
                        Batal
                    </button>
                    <button
                        className="px-4 py-2 bg-[#3c6255] text-[#eae7b1] rounded-md hover:bg-[#2c4f43] transition-colors"
                        onClick={handleCreate} 
                    >
                        Simpan Perubahan 
                    </button>
                </div>
            </div>
        </div>
    );
};