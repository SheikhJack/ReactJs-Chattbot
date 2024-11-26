import { useState, React } from 'react';
import { createChatBotMessage } from 'react-chatbot-kit';
import './App.css'
import Bot from './components/bot/FileUploadWidget';
import ChatBot from "react-chatbotify";
import FileUploadWidget from './components/bot/FileUploadWidget';
import ActionProvider from './components/action/ActionProvider';
import MessageParser from './components/action/MessagePasser';

function App() {


  const [name, setName] = useState("");


	const handleUpload = async (params, setChatbotState) => {
    const files = params.files;
  
    if (files && files.length > 0) {
      const formData = new FormData();
      formData.append("pdf", files[0]);
  
      try {
        const response = await fetch("https://9420-41-223-72-98.ngrok-free.app/analyze_pdf", {
          method: "POST",
          body: formData, // Automatically sets the correct Content-Type
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log("File upload successful:", data);
  
        // Update the chatbot state or process the result
        setChatbotState(data.results || "No results received from the server.");
      } catch (error) {
        console.error("Error during file upload:", error);
      }
    } else {
      console.error("No files to upload.");
    }
  };
  
  

	const flow = {
    start: {
      message: "Hello there! What is your name?",
      function: (params) => console.log("User input:", params.userInput),
      path: "upload_pdf",
    },
    upload_pdf: {
      message: (params) => `Nice to meet you ${params.userInput}, please upload your resume for analysis.`,
      chatDisabled: true,
      file: async (params) => {
        const result = await handleUpload(params);
        return result;
      },
       path: "end",
    },
    end: {
      message: (params) =>
        `Thank you! Your file has been processed. Results: ${params.results}`,
    },
  };
  
  
  
  return (
    <div className='container'>
      <h1>chatMaster</h1>
      <ChatBot 
      flow={flow} 
       />
    </div>
  )
}

export default App
