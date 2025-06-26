import React, { useEffect, useState } from 'react';

const EditProfil = ({ isOpen, onClose, currentUsername, currentProfileUrl, onSave }) => {
  const [newUsername, setNewUsername] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [profileFile, setProfileFile] = useState(null);

  useEffect(() => {
  if (isOpen) {
    setNewUsername(currentUsername || '');
    setProfileFile(null);
    setPreviewImage(currentProfileUrl || `${import.meta.env.VITE_API_BASE_URL}/storage/profile/defaultPP.webp`);
  }
}, [isOpen, currentUsername, currentProfileUrl]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      username: newUsername,
      profileFile: profileFile,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#a6bb8d]/40 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#eae7b1] p-6 rounded-lg shadow-xl w-11/12 max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-2xl text-[#3c6255] hover:text-red-600 transition-colors">
          <i className="ri-close-line"></i>
        </button>
        <h2 className="text-2xl font-bold text-[#3c6255] mb-6 text-center">Edit Profil</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center mb-6">
            <img
              src={previewImage || `${import.meta.env.VITE_API_BASE_URL}/storage/profile/defaultPP.webp`}
              alt="Preview Profil"
              className="w-24 h-24 rounded-full object-cover border-2 border-[#3c6255] mb-3"/>
            <label htmlFor="profile-image-upload" className="cursor-pointer bg-[#3c6255] text-[#eae7b1] px-4 py-2 rounded-md hover:bg-[#2c4f43] transition-colors">
              Ubah Foto Profil
              <input
                id="profile-image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          <div>
            <label htmlFor="username" className="block text-lg font-medium text-[#3c6255] mb-2">Username:</label>
            <input
              type="text"
              id="username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="w-full p-3 border border-[#3c6255] rounded-md bg-[#f5f4e0] text-[#3c6255] focus:outline-none focus:ring-2 focus:ring-[#3c6255]"
              required/>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-5 py-2 rounded-md mr-3 hover:bg-gray-500 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-[#3c6255] text-[#eae7b1] px-5 py-2 rounded-md hover:bg-[#2c4f43] transition-colors"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfil;
