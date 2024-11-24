import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import ProfilePage from './ProfilePage';
import Editor from '../components/editor/editor';

const HomePage: React.FC = () => {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-gray-800 text-white p-4 flex items-center justify-between">
        <h1 className="text-lg font-bold">Welcome to the Home Page</h1>
        {isAuthenticated && (
          <button
            onClick={() => logout({ returnTo: window.location.origin })}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        )}
      </nav>

      {/* Main Content */}
      {isAuthenticated ? (
        <>
          {/* Uncomment the ProfilePage component if needed */}
          {/* <ProfilePage /> */}
          <Editor />
        </>
      ) : (
        <button
          onClick={() => loginWithRedirect()}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4"
        >
          Login
        </button>
      )}
    </div>
  );
};

export default HomePage;
