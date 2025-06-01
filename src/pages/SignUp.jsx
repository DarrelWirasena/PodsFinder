import React from 'react';

export const SignUp = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#eae7b1]">
      <div className="w-full max-w-lg p-8 rounded-md bg-[#a6bb8d]/30 shadow-lg">
        <h1 className="text-4xl font-bold text-center text-[#3c6255] mb-4">
          Create an account
        </h1>
        <p className="text-2xl font-semibold text-center text-[#3c6255] mb-6">
          Already have an account? <a href="/login" className="text-[#3c6255] underline">Login</a>
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
          <label className="block text-base text-[#3c6255] mb-1">Email</label>
          <input
            type="email"
            className="w-full h-12 p-2 rounded-md bg-[#a6bb8d]/60"
            placeholder="Enter your email"
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
        
        <div className="flex items-center mb-4">
          <input type="checkbox" className="mr-2" />
          <label className="text-base text-[#3c6255]">I agree to the Terms & Conditions</label>
        </div>
        
        <button className="w-full h-12 rounded-md bg-[#3c6255] text-[#eae7b1] font-semibold mb-4">
          SIGN UP
        </button>
        
        <p className="text-center text-base text-[#3c6255] mb-4">---- or register with ----</p>
        
        <div className="flex justify-around">
          <div className="flex items-center">
            <img src="google.png" alt="Google" className="w-5 h-5 mr-2" />
            <span className="text-base text-[#eae7b1]">Google</span>
          </div>
          <div className="flex items-center">
            <img src="apple-inc.png" alt="Apple" className="w-5 h-5 mr-2" />
            <span className="text-base text-[#eae7b1]">Apple</span>
          </div>
        </div>
      </div>
    </div>
  );
};
