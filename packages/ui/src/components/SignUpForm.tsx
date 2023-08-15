import { AdminSignup, UserSignup } from 'common';
import React, { FormEvent, useRef } from 'react';
import { Link } from 'react-router-dom';

export const SignUpForm: React.FC<{ url: string, propData: (data: AdminSignup | UserSignup) => void }> = ({ url, propData }) => {
  const client = url.includes('admin') ? 'admin' : 'user';
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);

  const handleSignup = (e: FormEvent) => {
    e.preventDefault();
    if (
      usernameRef.current !== null &&
      passwordRef.current !== null &&
      emailRef.current !== null &&
      phoneRef.current !== null
    ) {

      if (
        usernameRef.current.value !== null &&
        passwordRef.current.value !== null &&
        emailRef.current.value !== null &&
        phoneRef.current.value !== null
      ) {

        const data: AdminSignup | UserSignup = {
          username: usernameRef.current.value,
          password: passwordRef.current.value,
          email: emailRef.current.value,
          phone: parseInt(phoneRef.current.value)
        };
        propData(data);
        usernameRef.current.value = '';
        passwordRef.current.value = '';
        emailRef.current.value = '';
        phoneRef.current.value = '';
      }
    }

  }
  return (

    <div className="bg-white p-8 shadow-md rounded-md w-[450px] hover:shadow-2xl transition-all ">
      <h2 className="text-2xl font-semibold mb-4 tracking-wide">{client === 'admin' ? 'Admin' : 'User'} Sign Up</h2>
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
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            ref={emailRef}
            type="email"
            id="email"
            className="mt-1 px-3 py-2 block w-full border rounded-md focus:ring focus:ring-blue-300"
            placeholder="Enter your email"
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
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            ref={phoneRef}
            type="number"
            id="phone"
            className="mt-1 px-3 py-2 block w-full border rounded-md focus:ring focus:ring-blue-300 transition-all"
            placeholder="Your Number Sir"
            required
          />
        </div>
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="w-fit bg-blue-500 text-white py-2 px-4 rounded-2xl hover:bg-blue-600 hover:scale-105 active:scale-90 transition-all"
          >
              Sign Up
          </button>
          <Link to={`/${client}/login`}><div className="hover:text-blue-500 hover:scale-105 active:scale-95 transition-all font-sans tracking-wide font-light">Already a {client[0].toUpperCase() + client.slice(1)}?</div></Link>
        </div>
      </form>
    </div>
  );
};

