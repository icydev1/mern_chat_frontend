import React from 'react';
import Header from '../landingpage/Header';
import Footer from '../landingpage/Footer';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <>
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4">
        <h2 className="text-4xl font-semibold text-center">Welcome to ChatApp</h2>
        <p className="mt-4 text-center">
          Connect with friends and family with ease. Start chatting today!
        </p>
        <div className="mt-8 flex justify-center space-x-4">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg">
            <Link to="/login">Login</Link>
          </button>

          <button className="px-6 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg">
            <Link to="/signup">Signup</Link>
          </button>
        </div>
      </main>
      <Footer />
    </div>
    </>
  );
};

export default LandingPage;
