// // src/pages/RegisterPage.jsx
// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';

// export const RegisterPage = () => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState(''); // Menambahkan input email
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(''); // Untuk pesan sukses
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     // --- LOGIKA REGISTRASI SIMULASI ---
//     // Di aplikasi nyata, ini adalah panggilan API ke backend untuk mendaftarkan user baru.
//     // Backend akan menyimpan data user (setelah dihash password) ke database.

//     // Contoh validasi dasar:
//     if (username.length < 3) {
//       setError('Username minimal 3 karakter.');
//       return;
//     }
//     if (!email.includes('@') || !email.includes('.')) {
//       setError('Format email tidak valid.');
//       return;
//     }
//     if (password.length < 6) {
//       setError('Password minimal 6 karakter.');
//       return;
//     }

//     // Jika semua validasi lolos (simulasi sukses pendaftaran)
//     console.log('Registration successful for:', { username, email, password });
//     setSuccess('Pendaftaran berhasil! Silakan login.');
//     // Opsional: Langsung arahkan ke halaman login setelah pendaftaran berhasil
//     setTimeout(() => {
//       navigate('/login'); 
//     }, 2000); // Redirect setelah 2 detik
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-[#EAE7B1]">
//       <div className="bg-transparent p-8 rounded-lg max-w-md w-full text-center">
//         <h1 className="text-5xl font-bold text-[#3c6255] mb-4 tracking-wide">
//           POD'S FINDER
//         </h1>
//         <p className="text-[#3c6255] text-lg mb-8">Create your account</p>

//         {error && (
//           <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
//             {error}
//           </p>
//         )}
//         {success && (
//           <p className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
//             {success}
//           </p>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <input
//               type="text"
//               id="reg-username"
//               placeholder="Username"
//               className="bg-[#D2E4D2] text-[#3c6255] placeholder-[#3c6255] border-none rounded w-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#3c6255]"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <input
//               type="email" // Tipe email untuk validasi dasar browser
//               id="reg-email"
//               placeholder="Email"
//               className="bg-[#D2E4D2] text-[#3c6255] placeholder-[#3c6255] border-none rounded w-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#3c6255]"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <input
//               type="password"
//               id="reg-password"
//               placeholder="Password"
//               className="bg-[#D2E4D2] text-[#3c6255] placeholder-[#3c6255] border-none rounded w-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#3c6255]"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="bg-[#3c6255] hover:bg-[#2e5246] text-[#EAE7B1] font-bold py-3 px-8 rounded-lg focus:outline-none focus:shadow-outline w-full mt-6"
//             >
//               REGISTER
//             </button>
//           </div>
//         </form>

//         <p className="text-[#3c6255] text-sm mt-4">
//           Already have an account?{' '}
//           <Link to="/login" className="text-[#007bff] hover:underline">
//             Login here
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };