import React from "react";
import Chatbot from "@/components/Chatbot";

const ChatbotPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md mb-8 text-center">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          MediShare Medical Chatbot
        </h1>
        <p className="text-gray-600">
          Ask questions about medicines, diseases, and Indian government medical schemes.
        </p>
      </div>
      
      {/* The chatbot component is now shown directly without the toggle button */}
      <div className="w-full max-w-md">
        <Chatbot standalone={true} />
      </div>
      
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>© 2023 MediShare. All rights reserved.</p>
        <p className="mt-2">
          Medical information provided by OpenAI API. 
          Always consult healthcare professionals for medical advice.
        </p>
      </div>
    </div>
  );
};

export default ChatbotPage;