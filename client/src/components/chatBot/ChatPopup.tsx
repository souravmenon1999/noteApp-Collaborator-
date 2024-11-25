import React, { useState, useEffect } from "react";
import axios from "axios";
import { io, Socket } from "socket.io-client";

const socket: Socket = io("http://localhost:3000");

const ChatPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ username: string; message: string }[]>([]);

  useEffect(() => {
    // Handle incoming messages
    socket.on("message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    // Cleanup on unmount
    return () => {
      socket.off("message");
    };
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    socket.emit("join", "User");
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    
    const userMessage = { username: "User", message: input };
    setMessages((prev) => [...prev, userMessage]);

    
    try {
      const response = await axios.post("http://localhost:3000/api/ai/generate", {
        prompt: input,
      });
      const aiMessage = { username: "AI", message: response.data.content };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error:", error);
    }

    setInput("");
  };

  return (
    <div className="relative">
      
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={handleOpen}
      >
        Ask AI
      </button>

    
      {isOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-4">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h2 className="text-lg font-semibold">Chat with AI</h2>
              <button
                className="text-red-500 hover:text-red-600"
                onClick={handleClose}
              >
                ×
              </button>
            </div>
            <div className="h-64 overflow-y-auto border rounded-md p-2 mb-4">
              {messages.map((msg, index) => (
                <div key={index} className="mb-2">
                  <strong>{msg.username}: </strong>
                  <span>{msg.message}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center">
              <input
                type="text"
                className="border rounded-md flex-grow px-2 py-1 mr-2"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                onClick={sendMessage}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPopup;
