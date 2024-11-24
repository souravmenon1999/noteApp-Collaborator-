import { ChatState, Message } from "../types/chat.types";

export const initialState: ChatState = {
  messages: [],
  isConnected: false,
  isLoading: false,
  error: null,
};

export const chatReducer = (state: ChatState, action: any): ChatState => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'SET_CONNECTED':
      return { ...state, isConnected: action.payload };
    case 'CLEAR_CHAT':
      return { ...state, messages: [] };
    default:
      return state;
  }
};
