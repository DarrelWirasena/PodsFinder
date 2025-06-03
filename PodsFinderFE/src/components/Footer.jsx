import React from 'react';
import { Link } from 'react-router-dom';
import PodsLogo from '../../public/podsFinderLogoSaja.png'; 

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#3c6255] text-[#EAE7B1] py-10 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <Link to="/" className="mb-4">
            <img src={PodsLogo} alt="PodsFinder Logo" className="w-14 md:w-22 h-auto" />
          </Link>
          <p className="text-sm md:text-base leading-relaxed max-w-xs">
            Temukan podcast favorit Anda. Ulasan jujur dari pendengar sejati.
          </p>
        </div>

        <div className="text-center md:text-left">
          <h3 className="font-semibold text-lg mb-4 text-[#A6BB8D]">Navigasi Cepat</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:underline text-sm md:text-base">Home</Link>
            </li>
            <li>
              <Link to="/genre" className="hover:underline text-sm md:text-base">Genre</Link>
            </li>
            <li>
              <Link to="/playlist" className="hover:underline text-sm md:text-base">Playlist</Link>
            </li>
            <li>
              <Link to="/reviewed" className="hover:underline text-sm md:text-base">Reviewed</Link>
            </li>
          </ul>
        </div>

        <div className="text-center md:text-left">
          <h3 className="font-semibold text-lg mb-4 text-[#A6BB8D]">Hubungi Kami</h3>
          <ul className="space-y-2">
            <li>
              <a href="mailto:info@podsfinder.com" className="hover:underline text-sm md:text-base">info@podsfinder.com</a>
            </li>
            <li>
              <a href="tel:+6281234567890" className="hover:underline text-sm md:text-base">+62 812-xxxx-xxxx</a>
            </li>
            <li className="flex justify-center md:justify-start gap-4 mt-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-[#A6BB8D] transition-colors"><i className="ri-twitter-fill"></i></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-[#A6BB8D] transition-colors"><i className="ri-instagram-fill"></i></a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-[#A6BB8D] transition-colors"><i className="ri-facebook-fill"></i></a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#A6BB8D]/50 mt-10 pt-6 text-center">
        <p className="text-sm text-[#EAE7B1]">
          &copy; {currentYear} PodsFinder. All rights reserved.
        </p>
      </div>
    </footer>
  );
};