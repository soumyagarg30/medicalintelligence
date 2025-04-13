import React from "react";
import { Link } from "wouter";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <svg
              className="h-10 w-10 text-primary"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66" />
              <path d="m18 15-2-2" />
              <path d="m15 18-2-2" />
            </svg>
            <span className="ml-2 text-xl font-semibold text-gray-900">MediShare</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="/">
              <a className="text-gray-700 hover:text-primary">Home</a>
            </Link>
            <a href="#" className="text-gray-700 hover:text-primary">About</a>
            <a href="#" className="text-gray-700 hover:text-primary">Donate</a>
            <a href="#" className="text-gray-700 hover:text-primary">Request</a>
            <a href="#" className="text-gray-700 hover:text-primary">Contact</a>
          </nav>
          <div className="hidden md:flex items-center space-x-2">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-md">
              Sign In
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-indigo-700 rounded-md">
              Register
            </button>
          </div>
          <button className="md:hidden rounded-md p-2 text-gray-500 hover:text-gray-700">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16m-7 6h7" 
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
