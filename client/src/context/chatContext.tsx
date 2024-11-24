import React, { createContext, useReducer, useContext } from 'react';
import { chatReducer, initialState } from '../reducers/chatReducer';
import { ChatState } from '../types/chat.types';
import { useSocket } from '../hooks/useSocket';

interface ChatContextProps {
  state: ChatState;
  sendMessage: (message: string) => void;
  clearChat: () => void;
}

export const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const { socket, isConnected } = useSocket();

  const sendMessage = (content: string) => {
    if (!isConnected) return;
    const message = { id: crypto.randomUUID(), role: 'user', content, timestamp: new Date() };
    dispatch({ type: 'ADD_MESSAGE', payload: message });
    socket?.emit('sendMessage', { message: content });
  };

  const clearChat = () => {
    socket?.emit('clearHistory');
    dispatch({ type: 'CLEAR_CHAT' });
  };

  return (
    <ChatContext.Provider value={{ state, sendMessage, clearChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextProps => {
  const context = useContext(ChatContext);
  if (!context) throw new Error('useChat must be used within a ChatProvider');
  return context;
};
