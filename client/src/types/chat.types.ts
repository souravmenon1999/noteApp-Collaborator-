export interface Message {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: Date;
  }
  
  export interface ChatState {
    messages: Message[];
    isConnected: boolean;
    isLoading: boolean;
    error: string | null;
  }
  