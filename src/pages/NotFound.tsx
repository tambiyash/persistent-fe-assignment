import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div data-testid="not-found-container" className="min-h-screen bg-gray-50">
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page not found</p>
        <a href="/home" className="text-yellow-600 hover:underline">Go back to Home</a>
      </div>
    </div>
  );
};

export default NotFound; 