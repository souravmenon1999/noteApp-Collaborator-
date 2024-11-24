import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { Auth0ProviderWithHistory } from './auth/Auth0Provider';
import { Provider } from 'react-redux';
import store from './redux/store';
import './index.css'; // This will apply Tailwind globally
import { ChatProvider } from './context/ChatContext';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>

    <Provider store={store}>
      <ChatProvider>
        <Router>
          <Auth0ProviderWithHistory>
            <App />
          </Auth0ProviderWithHistory>
        </Router>
      </ChatProvider>
  
    </Provider>
   
  </React.StrictMode>
);
