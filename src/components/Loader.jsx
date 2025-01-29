// Loader.js
import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-gray-300"></div>
    </div>
  );
};

export default Loader;
