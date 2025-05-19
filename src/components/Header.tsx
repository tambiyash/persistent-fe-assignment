import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  return (
    <header className="bg-yellow-400 py-6 shadow-md mb-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Products Store</h1>
        <nav className="mt-2 md:mt-0">
          <Link to="/home" className={`text-gray-900 font-medium hover:underline mr-4 ${location.pathname === '/home' ? 'underline' : ''}`}>Home</Link>
          <Link to="/product-list" className={`text-gray-900 font-medium hover:underline ${location.pathname === '/product-list' ? 'underline' : ''}`}>Product List</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header; 