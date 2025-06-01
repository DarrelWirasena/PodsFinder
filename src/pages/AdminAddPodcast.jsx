import React from 'react'

export const AdminAddPodcast = () => {
  return (
    <div>
      <div className="p-4 md:p-8 lg:p-12"> {/* Tambahkan padding ke container utama */}
  {/* Header Section */}
  <h1 className="text-3xl md:text-4xl font-bold text-[#3c6255] mb-4"> {/* Menggunakan h1 untuk semantik, ukuran teks responsif */}
    Podcast Information
  </h1>
  <hr className="border-t-2 border-[#3C6255] mb-8" /> {/* Menggunakan hr biasa untuk garis */}

  {/* Content Section - Menggunakan Flexbox untuk tata letak yang lebih baik */}
  <div className="flex flex-col gap-6"> {/* Spasi vertikal antar grup elemen */}

    {/* Podcast Details - Jika ini adalah pasangan label dan input/display, bisa diulang */}
    {/* Contoh satu baris detail, Anda bisa mengulang div ini */}
    <div className="flex flex-col gap-2"> {/* Grup label dan placeholder */}
      <p className="text-lg text-[#3c6255]">Podcast Title</p>
      <input className="w-1/2 h-[50px] rounded-md bg-[#a6bb8d]/60" /> {/* Lebar penuh, tinggi tetap */}
    </div>
    <div className="flex flex-col gap-2">
      <p className="text-lg text-[#3c6255]">Date</p>
      <input className="w-1/2 h-[50px] rounded-md bg-[#a6bb8d]/60" />
    </div>
    <div className="flex flex-col gap-2">
      <p className="text-lg text-[#3c6255]">Description</p>
      <input className="w-1/2 h-[50px] rounded-md bg-[#a6bb8d]/60" />
    </div>
    <div className="flex flex-col gap-2">
      <p className="text-lg text-[#3c6255]">Creator</p>
      <input className="w-1/2 h-[50px] rounded-md bg-[#a6bb8d]/60" />
    </div>
    <div className="flex flex-col gap-2">
      <p className="text-lg text-[#3c6255]">Genre</p>

      <input className="w-1/2 h-[50px] rounded-md bg-[#a6bb8d]/60" />
    </div>

  </div>

  {/* Action Buttons - Menggunakan Flexbox untuk mengatur tombol */}
  <div className="flex flex-col sm:flex-row justify-start gap-4 mt-8"> {/* Tombol di bawah dan spasi di antara mereka */}
    {/* Submit Button */}
    <button className="flex items-center justify-center gap-2 w-[100px] h-[35px] rounded-md bg-[#3c6255] text-[#eae7b1] text-base hover:opacity-90 transition-opacity">
      <img
        alt="Back"
        className="ri-arrow-left-wide-line w-5 h-5 object-contain"
      />
      Back
    </button>
    <button className="flex items-center justify-center gap-2 w-[100px] h-[35px] rounded-md bg-[#3c6255] text-[#eae7b1] text-base hover:opacity-90 transition-opacity">
      <img
        alt="Send"
        className="ri-send-plane-fill w-5 h-5 object-contain"
      />
      Submit
    </button>

    {/* Back Button */}
   
  </div>
</div>
    </div>
  )
}
