import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0 bg-indigo-100 rounded-full w-8 h-8 flex items-center justify-center">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-4 w-4 text-primary" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" 
          />
        </svg>
      </div>
      <div className="ml-2 bg-secondary rounded-lg rounded-tl-none px-4 py-2">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
