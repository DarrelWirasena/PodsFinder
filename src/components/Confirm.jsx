import React from 'react';

export const Confirm = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#a6bb8d]/40" 
      onClick={onCancel} 
    >
      <div
        className="p-6 flex rounded-lg flex-col bg-[#a6bb8d]/90 shadow-xl max-w-sm w-full relative" // Added relative for z-index, adjusted opacity
      >
        <p className="text-xl font-bold text-[#3c6255] mb-6 text-center">
          Anda yakin?
        </p>
        <div className="flex justify-around gap-3">
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex-1"
          >
            Ya
          </button>
          <button
            onClick={onCancel}
            className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex-1"
          >
            Tidak
          </button>
        </div>
      </div>
    </div>
  );
};