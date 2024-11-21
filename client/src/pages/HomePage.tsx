import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import ProfilePage from './ProfilePage';

const HomePage: React.FC = () => {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {isAuthenticated ? (
        <button onClick={() => logout({ returnTo: window.location.origin })}>
          Logout
          <ProfilePage />
        </button>
      ) : (
        <button onClick={() => loginWithRedirect()}>Login</button>
      )}
    </div>
  );
};

export default HomePage;
