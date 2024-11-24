import React from 'react';
import { useChat } from '../../hooks/useChat';
import ConnectionStatus from './connectionStatus';

export const ChatContainer: React.FC = () => {
  const { state, sendMessage, clearChat } = useChat();

  return (
    <div className="flex flex-col h-[600px] w-full max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <ConnectionStatus isConnected={state.isConnected} />
        <button
          onClick={clearChat}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
        >
          Clear Chat
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {state.isLoading ? (
          <div>Assistant is typing...</div>
        ) : (
          state.messages.map((message) => (
            <div key={message.id} className={`message-${message.role}`}>
              <strong>{message.role}</strong>: {message.content}
            </div>
          ))
        )}
      </div>
      <div className="mt-4">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full p-2 border rounded"
          onKeyDown={(e) => {
            if (e.key === 'Enter') sendMessage(e.currentTarget.value);
          }}
        />
      </div>
    </div>
  );
};
