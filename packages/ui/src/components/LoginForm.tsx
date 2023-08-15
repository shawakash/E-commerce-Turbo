import { AdminSignup, UserLogin, UserSignup, adminLogin } from 'common';
import React, { FormEvent, useRef } from 'react';
import { Link } from 'react-router-dom';

export const LoginForm: React.FC<{ url: string, propData: (data: adminLogin | UserLogin) => void }> = ({ url, propData }) => {
  const client = url.includes('admin') ? 'admin' : 'user';
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const handleSignup = (e: FormEvent) => {
    e.preventDefault();
    if (
      usernameRef.current !== null &&
      passwordRef.current !== null
    ) {

      if (
        usernameRef.current.value !== null &&
        passwordRef.current.value !== null
      ) {

        const data: adminLogin | UserLogin = {
          username: usernameRef.current.value,
          password: passwordRef.current.value,
        };
        propData(data);
        usernameRef.current.value = '';
        passwordRef.current.value = '';
      }
    }

  }
  return (

    <div className="bg-white p-8 shadow-md rounded-md w-[450px] hover:shadow-2xl transition-all ">
      <h2 className="text-2xl font-semibold mb-4 tracking-wide">{client === 'admin' ? 'Admin' : 'User'} Login</h2>
      <form onSubmit={handleSignup}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            ref={usernameRef}
            type="text"
            id="username"
            className="mt-1 px-3 py-2 block w-full border rounded-md focus:ring focus:ring-blue-300"
            placeholder="Enter your username"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            ref={passwordRef}
            type="password"
            id="password"
            className="mt-1 px-3 py-2 block w-full border rounded-md focus:ring focus:ring-blue-300"
            placeholder="Enter your password"
            required
          />
        </div>
        
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="w-fit bg-blue-500 rounded-2xl text-white py-2 px-4 hover:bg-blue-600 hover:scale-105 active:scale-90 transition-all"
          >
            Log In
          </button>
          <Link to={`/${client}/signup`}><div className="hover:text-blue-500 hover:scale-105 active:scale-95 transition-all font-sans tracking-wide font-light">New Here?</div></Link>
        </div>
      </form>
    </div>
  );
};

