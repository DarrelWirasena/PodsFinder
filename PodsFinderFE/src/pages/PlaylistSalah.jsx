// import React from 'react';
// // Import gambar Anda
// import Berizik from '../assets/images/michelle.jpg'';
// import StarIcon from '../assets/images/michelle.jpg'; // Pastikan path benar
// import Screenshot1 from '../assets/images/michelle.jpg';
// import Screenshot2 from '../assets/images/michelle.jpg';
// import Screenshot3 from '.../assets/images/michelle.jpg';
// import Screenshot4 from '../assets/images/michelle.jpg';
// import ProfilePic from '../assets/images/michelle.jpg';
// import BackArrow from '../assets/images/michelle.jpg';


// export const Playlist = () => {
//   return (
//     // Kontainer utama: Gunakan min-h-screen untuk tinggi minimum agar responsif
//     // mx-auto untuk centering, px-4 untuk padding horizontal default
//     // bg-[#eae7b1] untuk warna latar belakang
//     <div className="min-h-screen bg-[#eae7b1] p-4 md:p-8">
//       {/* Header atau Navigasi (jika ada, tambahkan di sini) */}

//       {/* Bagian Logout */}
//       <div className="flex justify-end mb-8"> {/* Menggunakan flexbox untuk posisi tombol logout */}
//         <button className="bg-[#3c6255] text-[#eae7b1] px-6 py-2 rounded-md hover:opacity-90">
//           Log out
//         </button>
//       </div>

//       {/* Bagian Profil Pengguna */}
//       <div className="flex items-center mb-12"> {/* Menggunakan flexbox untuk item sejajar */}
//         <img
//           src={ProfilePic}
//           alt="Profile"
//           className="w-20 h-20 rounded-full mr-4 object-cover" // Gunakan rounded-full untuk lingkaran
//         />
//         <div>
//           <p className="text-xl font-semibold text-[#3c6255]">
//             Michelle
//           </p>
//           <p className="text-lg text-[#3c6255]">
//             @celow
//           </p>
//         </div>
//       </div>

//       {/* Garis Pembatas - Tetap pakai SVG jika ingin presisi, tapi posisi relatif */}
//       <hr className="border-t-2 border-[#3c6255] my-8" /> {/* Menggunakan hr biasa dengan Tailwind */}

//       {/* Bagian Playlist Grid */}
//       {/* Gunakan grid responsif: 1 kolom di mobile, 2 di md, 4 di lg */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
//         {/* Contoh Playlist Item (Playlist 1) */}
//         <div className="bg-[#3c6255] p-4 rounded-lg shadow-md">
//           <h2 className="text-2xl font-semibold text-[#eae7b1] mb-4">
//             Playlist 1
//           </h2>
//           <div className="grid grid-cols-2 gap-2 mb-4">
//             <img src={Screenshot1} alt="Playlist Cover 1" className="w-full h-auto rounded object-cover aspect-square" />
//             <img src={Screenshot2} alt="Playlist Cover 2" className="w-full h-auto rounded object-cover aspect-square" />
//             <img src={Screenshot3} alt="Playlist Cover 3" className="w-full h-auto rounded object-cover aspect-square" />
//             <img src={Screenshot4} alt="Playlist Cover 4" className="w-full h-auto rounded object-cover aspect-square" />
//           </div>
//         </div>

//         {/* Contoh Playlist Item (Playlist 2 - ulangi struktur di atas) */}
//         <div className="bg-[#3c6255] p-4 rounded-lg shadow-md">
//             <h2 className="text-2xl font-semibold text-[#eae7b1] mb-4">
//                 Playlist 2
//             </h2>
//             <div className="grid grid-cols-2 gap-2 mb-4">
//                 <img src={Screenshot1} alt="Playlist Cover 1" className="w-full h-auto rounded object-cover aspect-square" />
//                 <img src={Screenshot2} alt="Playlist Cover 2" className="w-full h-auto rounded object-cover aspect-square" />
//                 <img src={Screenshot3} alt="Playlist Cover 3" className="w-full h-auto rounded object-cover aspect-square" />
//                 <img src={Screenshot4} alt="Playlist Cover 4" className="w-full h-auto rounded object-cover aspect-square" />
//             </div>
//         </div>

//         {/* Contoh Playlist Item (Playlist 3 - ulangi struktur di atas) */}
//         <div className="bg-[#3c6255] p-4 rounded-lg shadow-md">
//             <h2 className="text-2xl font-semibold text-[#eae7b1] mb-4">
//                 Playlist 3
//             </h2>
//             <div className="grid grid-cols-2 gap-2 mb-4">
//                 <img src={Screenshot1} alt="Playlist Cover 1" className="w-full h-auto rounded object-cover aspect-square" />
//                 <img src={Screenshot2} alt="Playlist Cover 2" className="w-full h-auto rounded object-cover aspect-square" />
//                 <img src={Screenshot3} alt="Playlist Cover 3" className="w-full h-auto rounded object-cover aspect-square" />
//                 <img src={Screenshot4} alt="Playlist Cover 4" className="w-full h-auto rounded object-cover aspect-square" />
//             </div>
//         </div>

//         {/* Contoh Playlist Item (Playlist 4 - ulangi struktur di atas) */}
//         <div className="bg-[#3c6255] p-4 rounded-lg shadow-md">
//             <h2 className="text-2xl font-semibold text-[#eae7b1] mb-4">
//                 Playlist 4
//             </h2>
//             <div className="grid grid-cols-2 gap-2 mb-4">
//                 <img src={Screenshot1} alt="Playlist Cover 1" className="w-full h-auto rounded object-cover aspect-square" />
//                 <img src={Screenshot2} alt="Playlist Cover 2" className="w-full h-auto rounded object-cover aspect-square" />
//                 <img src={Screenshot3} alt="Playlist Cover 3" className="w-full h-auto rounded object-cover aspect-square" />
//                 <img src={Screenshot4} alt="Playlist Cover 4" className="w-full h-auto rounded object-cover aspect-square" />
//             </div>
//         </div>

//       </div>

//       {/* Bagian Daftar Episode */}
//       <h2 className="text-2xl font-bold text-[#3c6255] mb-6">Daftar Episode</h2>
//       <hr className="border-t-2 border-[#3c6255] my-8" />

//       {/* Item Episode 1 */}
//       <div className="flex items-center mb-6 p-4 bg-white rounded-lg shadow-sm">
//         <img src={Berizik} alt="Episode Cover" className="w-28 h-28 rounded object-cover mr-4" />
//         <div>
//           <p className="text-base text-[#3c6255]">BERIZIK</p>
//           <h3 className="text-lg font-semibold text-[#3c6255] mb-1">
//             EP29: Last Playlist Berizik
//           </h3>
//           <div className="flex items-center text-[#3c6255]">
//             <p className="mr-1">4.5</p>
//             <img src={StarIcon} alt="Star" className="w-4 h-4 object-contain" />
//           </div>
//         </div>
//       </div>

//       {/* Item Episode 2 */}
//       <div className="flex items-center mb-6 p-4 bg-white rounded-lg shadow-sm">
//         <img src={Screenshot1} alt="Episode Cover" className="w-28 h-28 rounded object-cover mr-4" />
//         <div>
//           <p className="text-base text-[#3c6255]">Nessie Judge: A Night Ride</p>
//           <h3 className="text-lg font-semibold text-[#3c6255] mb-1">
//             Hantu Tertangkap Kamera &amp; Sihir Pelindung Di Gorontalo
//           </h3>
//           <div className="flex items-center text-[#3c6255]">
//             <p className="mr-1">4.5</p>
//             <img src={StarIcon} alt="Star" className="w-4 h-4 object-contain" />
//           </div>
//         </div>
//       </div>

//       {/* Item Episode 3 */}
//       <div className="flex items-center mb-6 p-4 bg-white rounded-lg shadow-sm">
//         <img src={Screenshot2} alt="Episode Cover" className="w-28 h-28 rounded object-cover mr-4" />
//         <div>
//           <p className="text-base text-[#3c6255]">DEDDY ISSUES (Deddy Corbuzier)</p>
//           <h3 className="text-lg font-semibold text-[#3c6255] mb-1">
//             Eps 50: Keluar dari Zona Aman &amp; Hiduplah...
//           </h3>
//           <div className="flex items-center text-[#3c6255]">
//             <p className="mr-1">4.5</p>
//             <img src={StarIcon} alt="Star" className="w-4 h-4 object-contain" />
//           </div>
//         </div>
//       </div>

//       {/* Tombol Back */}
//       <div className="flex justify-start mt-8">
//         <button className="bg-[#3c6255] text-[#eae7b1] px-6 py-2 rounded-md flex items-center hover:opacity-90">
//           <img src={BackArrow} alt="Back" className="w-5 h-5 mr-2 object-contain" />
//           Back
//         </button>
//       </div>

//     </div>
//   );
// };