import React, { useRef , useState} from 'react';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextsPorvider';
import { Navigate } from 'react-router-dom';


export const SignUp = () => {

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const [errors, setErrors] = useState(null)

  const {setUser, setToken} = useStateContext()
  const {token}= useStateContext();
  const onSubmit = (ev) => {
    ev.preventDefault()
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    }

    axiosClient.post('/signup', payload)
    .then(({data})=>{
      setUser(data.user)
      setToken(data.token)
    })
    .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors)
        }
      })
  }
  if (!token){

  }else{
    return<Navigate to="/"/>
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#eae7b1]">
      <div className="w-full max-w-lg p-8 rounded-md bg-[#a6bb8d]/30 shadow-lg">
        <h1 className="text-4xl font-bold text-center text-[#3c6255] mb-4">
          Create an account
        </h1>
        <p className="text-2xl font-semibold text-center text-[#3c6255] mb-6">
          Already have an account? <a href="/login" className="text-[#3c6255] underline">Login</a>
        </p>
        
          {errors &&
            <p className="alert">
              {Object.keys(errors).map(key => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </p>
          }

        <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-base text-[#3c6255] mb-1">Username</label>
          <input ref={nameRef}
            type="text"
            className="w-full h-12 p-2 rounded-md bg-[#a6bb8d]/60"
            placeholder="Enter your username"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-base text-[#3c6255] mb-1">Email</label>
          <input ref={emailRef}
            type="email"
            className="w-full h-12 p-2 rounded-md bg-[#a6bb8d]/60"
            placeholder="Enter your email"
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

        <div className="mb-4">
          <label className="block text-base text-[#3c6255] mb-1">Retype Your Password</label>
          <input ref={passwordConfirmationRef}
            type="password"
            className="w-full h-12 p-2 rounded-md bg-[#a6bb8d]/60"
            placeholder="Enter your password"
          />
        </div>
        
        {/* <div className="flex items-center mb-4">
          <input type="checkbox" className="mr-2" />
          <label className="text-base text-[#3c6255]">I agree to the Terms & Conditions</label>
        </div> */}
        
        <button className="w-full h-12 rounded-md bg-[#3c6255] text-[#eae7b1] font-semibold mb-4">
          SIGN UP
        </button>
        </form>
               
      </div>
    </div>
  );
};
