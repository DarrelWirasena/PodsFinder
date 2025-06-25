import React, { useState, useEffect } from 'react';

export const AddPlaylist = ({ 
    isOpen, 
    onClose, 
    playlists, 
    onAddToPlaylist, 
    onCreateNewPlaylist, 
    currentPodcastId,
    initialSelectedPlaylistIds
}) => {
    const [selectedPlaylists, setSelectedPlaylists] = useState([]);
    const [newPlaylistName, setNewPlaylistName] = useState('');

    useEffect(() => {
        if (isOpen && initialSelectedPlaylistIds) {
            setSelectedPlaylists(initialSelectedPlaylistIds);
        } else if (!isOpen) {
            setSelectedPlaylists([]);
            setNewPlaylistName('');
        }
    }, [isOpen, initialSelectedPlaylistIds]);

    if (!isOpen) return null;

    const handleCheckboxChange = (playlistId) => {
        setSelectedPlaylists(prevSelected => {
            if (prevSelected.includes(playlistId)) {
                return prevSelected.filter(id => id !== playlistId); 
            } else {
                return [...prevSelected, playlistId]; 
            }
        });
    };

    const handleCreatePlaylist = async () => {
        if (newPlaylistName.trim() === '') {
            alert('Nama playlist tidak boleh kosong!');
            return;
        }
        const newId = await onCreateNewPlaylist(newPlaylistName);
        if (newId) {
            setSelectedPlaylists(prevSelected => [...prevSelected, newId]);
            setNewPlaylistName(''); 
        }
    };

    const handleDone = () => {
        onAddToPlaylist(selectedPlaylists, currentPodcastId);
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

                <h3 className="text-xl font-bold text-[#3c6255] mb-4 text-center">Tambahkan ke Playlist</h3>
                
                <div className="mb-6 border-b border-[#3c6255] pb-4">
                    <h4 className="text-lg font-semibold text-[#3c6255] mb-2">Buat Playlist Baru</h4>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Add New Playlist"
                            className="flex-grow p-2 rounded-md border border-[#3c6255] bg-white text-[#3c6255] focus:outline-none focus:ring-1 focus:ring-[#2c4f43]"
                            value={newPlaylistName}
                            onChange={(e) => setNewPlaylistName(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handleCreatePlaylist();
                                }
                            }}
                        />
                        <button
                            onClick={handleCreatePlaylist}
                            className="px-4 py-2 bg-[#3c6255] text-[#eae7b1] rounded-md hover:bg-[#2c4f43] transition-colors"
                        >
                            Buat
                        </button>
                    </div>
                </div>

                <h4 className="text-lg font-semibold text-[#3c6255] mb-3">Pilih Playlist yang Ada</h4>
                <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                    {playlists.length > 0 ? (
                        playlists.map((playlist) => (
                            <label
                                key={playlist.id}
                                className="flex items-center w-full p-3 rounded-md bg-[#3c6255] text-[#eae7b1] hover:bg-[#2c4f43] transition-colors duration-200 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-5 w-5 text-[#a6bb8d] rounded focus:ring-0 mr-3"
                                    checked={selectedPlaylists.includes(playlist.id)}
                                    onChange={() => handleCheckboxChange(playlist.id)}
                                />
                                <span className="flex-grow text-left">{playlist.title}</span>
                                {selectedPlaylists.includes(playlist.id) && (
                                    <i className="ri-check-line text-xl ml-2 text-[#a6bb8d]"></i>
                                )}
                            </label>
                        ))
                    ) : (
                        <p className="text-[#3c6255] text-center">Tidak ada playlist yang tersedia. Buat yang baru!</p>
                    )}
                </div>

                <div className="flex justify-end mt-6">
                    <button
                        className="px-6 py-2 bg-[#3c6255] text-[#eae7b1] rounded-md hover:bg-[#2c4f43] transition-colors"
                        onClick={handleDone}
                    >
                        Selesai
                    </button>
                </div>
            </div>
        </div>
    );
};