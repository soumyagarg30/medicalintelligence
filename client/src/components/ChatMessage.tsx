import React from "react";
import { Message } from "@/lib/types";

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  if (message.role === "user") {
    return (
      <div className="flex items-start justify-end">
        <div className="mr-2 bg-primary text-white rounded-lg rounded-tr-none px-4 py-2 max-w-[80%]">
          <p className="text-sm">{message.content}</p>
        </div>
        <div className="flex-shrink-0 bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 text-gray-500" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
            />
          </svg>
        </div>
      </div>
    );
  }
  
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
      <div className="ml-2 bg-secondary rounded-lg rounded-tl-none px-4 py-2 max-w-[80%]">
        <p className="text-gray-800 text-sm whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
};
