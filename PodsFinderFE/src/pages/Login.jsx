import React, { useRef, useState } from 'react';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextsPorvider';
import { Navigate } from 'react-router-dom';

export const Login = () => {
  const [message, setMessage] = useState(null)
  const {token, setUser, setToken}= useStateContext()
  const emailRef = useRef();
  const passwordRef = useRef();
  const onSubmit = (ev) => {
    ev.preventDefault()

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }

    axiosClient.post('/login', payload)
    .then(({data})=>{
      setUser(data.user)
      setToken(data.token)
    })
    .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setMessage(response.data.message)
        }
      })

  }
    
      if(!token){
      
    }else{
      return <Navigate to="/"/>
    }
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#eae7b1]">
      <div className="w-full max-w-md p-8 rounded-md bg-[#a6bb8d]/30 shadow-lg">
        <h1 className="text-4xl font-bold text-center text-[#3c6255] mb-4">
          POD’S FINDER
        </h1>
        <p className="text-2xl font-semibold text-center text-[#3c6255] mb-6">
          Welcome back!
        </p>

        {message &&
            <div className="alert">
              <p>{message}</p>
            </div>
          }

        <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-base text-[#3c6255] mb-1">Email</label>
          <input ref={emailRef}
            type="email"
            className="w-full h-12 p-2 rounded-md bg-[#a6bb8d]/60"
            placeholder="Enter your username"
          />
        </div>
        <div className="mb-4">
          <label className="block text-base text-[#3c6255] mb-1">Password</label>
          <input ref={passwordRef}
            type="password"
            className="w-full h-12 p-2 rounded-md bg-[#a6bb8d]/60"
            placeholder="Enter your password"
          />
        </div>
        <div className="flex justify-between items-center mb-4">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-base text-[#3c6255]">Remember me</span>
          </label>
          <a href="#" className="text-base text-[#3c6255]">Forgot password?</a>
        </div>
        <button className="w-full h-12 rounded-md bg-[#3c6255] text-[#eae7b1] font-semibold">
          LOGIN
        </button>
        </form>
      </div>
    </div>
  );
};
