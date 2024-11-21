import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const ProfilePage: React.FC = () => {
  const { user } = useAuth0();
  console.log(user);
  

  return (
    <div>
      <h1>Profile</h1>
      {user && (
        <>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <img src={user.picture} alt="React Image" />

        </>
      )}
    </div>
  );
};

export default ProfilePage;
