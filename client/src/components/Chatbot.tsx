import React, { useState, useRef, useEffect } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { ChatMessage } from "@/components/ChatMessage";
import Loading from "@/components/Loading";
import { Message } from "@/lib/types";

interface ChatbotProps {
  standalone?: boolean;
}

const Chatbot: React.FC<ChatbotProps> = ({ standalone = false }) => {
  const [isOpen, setIsOpen] = useState(standalone);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: "Hello! I'm MediBot, your medical assistant. How can I help you today? I can answer questions about medicines, diseases, and Indian government medical schemes."
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  
  // Toggle chat window (only used when not in standalone mode)
  const toggleChat = () => {
    if (!standalone) {
      setIsOpen(!isOpen);
    }
  };
  
  // Mutation for sending chat messages
  const chatMutation = useMutation({
    mutationFn: async (userMessage: string) => {
      const response = await apiRequest("POST", "/api/chat", { message: userMessage });
      const data = await response.json();
      return data;
    },
    onSuccess: (data) => {
      // Add the bot's response to the chat
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          role: "assistant",
          content: data.message
        }
      ]);
    },
    onError: (error) => {
      console.error("Chat error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get a response. Please try again.",
        variant: "destructive"
      });
      
      // Add an error message in the chat
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          role: "assistant",
          content: "I'm sorry, I couldn't process your request. Please try again."
        }
      ]);
    }
  });
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      return;
    }
    
    // Add the user's message to the chat
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        role: "user",
        content: message
      }
    ]);
    
    // Send to the API
    chatMutation.mutate(message);
    
    // Clear input
    setMessage("");
  };

  // Render different containers based on standalone mode
  return standalone ? (
    // Standalone mode - full chatbot without toggle button
    <div className="bg-white rounded-lg shadow-xl overflow-hidden flex flex-col w-full h-[500px]">
      {/* Chat Header */}
      <div className="bg-primary text-white px-4 py-3 flex items-center">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 mr-2" 
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
        <h3 className="font-semibold">MediBot</h3>
      </div>
      
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        
        {/* Loading indicator */}
        {chatMutation.isPending && <Loading />}
        
        {/* Invisible div for auto-scrolling */}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Chat Input */}
      <div className="border-t border-gray-200 p-3 bg-white">
        <form className="flex items-center" onSubmit={handleSubmit}>
          <input 
            type="text" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask about medicines, diseases, or schemes..." 
            className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
          />
          <button 
            type="submit" 
            className="bg-primary text-white px-4 py-2 rounded-r-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            disabled={chatMutation.isPending || !message.trim()}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" 
              />
            </svg>
          </button>
        </form>
        <div className="text-xs text-gray-500 mt-1 text-center">
          <p>Medical information provided by OpenAI API. Consult healthcare professionals for medical advice.</p>
        </div>
      </div>
    </div>
  ) : (
    // Regular floating mode with toggle button
    <div className="fixed bottom-6 right-6 z-50">
      {/* Minimized Chat Button */}
      {!isOpen && (
        <div 
          className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg cursor-pointer hover:bg-indigo-700 transition-all duration-300"
          onClick={toggleChat}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-8 w-8" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" 
            />
          </svg>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl overflow-hidden flex flex-col w-80 sm:w-96 h-[500px] max-h-[80vh]">
          {/* Chat Header */}
          <div className="bg-primary text-white px-4 py-3 flex justify-between items-center">
            <div className="flex items-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-2" 
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
              <h3 className="font-semibold">MediBot</h3>
            </div>
            <div className="flex space-x-2">
              <button 
                className="hover:bg-indigo-600 rounded-full w-8 h-8 flex items-center justify-center"
                onClick={toggleChat}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M20 12H4" 
                  />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            
            {/* Loading indicator */}
            {chatMutation.isPending && <Loading />}
            
            {/* Invisible div for auto-scrolling */}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Chat Input */}
          <div className="border-t border-gray-200 p-3 bg-white">
            <form className="flex items-center" onSubmit={handleSubmit}>
              <input 
                type="text" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask about medicines, diseases, or schemes..." 
                className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
              />
              <button 
                type="submit" 
                className="bg-primary text-white px-4 py-2 rounded-r-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                disabled={chatMutation.isPending || !message.trim()}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" 
                  />
                </svg>
              </button>
            </form>
            <div className="text-xs text-gray-500 mt-1 text-center">
              <p>Medical information provided by OpenAI API. Consult healthcare professionals for medical advice.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
