import React from 'react';

interface ChatToggleButtonProps {
  onClick: () => void;
}

const ChatToggleButton: React.FC<ChatToggleButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="fixed bottom-8 right-8 p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600"
  >
    Chat
  </button>
);

export default ChatToggleButton;
