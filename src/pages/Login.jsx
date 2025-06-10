import React from 'react';

export const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#eae7b1]">
      <div className="w-full max-w-md p-8 rounded-md bg-[#a6bb8d]/30 shadow-lg">
        <h1 className="text-4xl font-bold text-center text-[#3c6255] mb-4">
          POD’S FINDER
        </h1>
        <p className="text-2xl font-semibold text-center text-[#3c6255] mb-6">
          Welcome back!
        </p>
        <div className="mb-4">
          <label className="block text-base text-[#3c6255] mb-1">Username</label>
          <input
            type="text"
            className="w-full h-12 p-2 rounded-md bg-[#a6bb8d]/60"
            placeholder="Enter your username"
          />
        </div>
        <div className="mb-4">
          <label className="block text-base text-[#3c6255] mb-1">Password</label>
          <input
            type="password"
            className="w-full h-12 p-2 rounded-md bg-[#a6bb8d]/60"
            placeholder="Enter your password"
          />
        </div>
      
        <button className="w-full h-12 rounded-md bg-[#3c6255] text-[#eae7b1] font-semibold">
          LOGIN
        </button>
      </div>
    </div>
  );
};
