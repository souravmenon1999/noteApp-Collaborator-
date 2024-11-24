import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/users';
import { Note } from '../models/notes';
import axios from 'axios';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  // Check if the Authorization header is missing
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization token is missing' });
  }

  try {
    // Extract the token from the Authorization header
    const token = authHeader.split(' ')[1];
   

    // Decode the token to extract the Auth0 issuer URL (iss)
    const decodedToken: any = jwt.decode(token, { complete: true });
    if (!decodedToken) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Extract the Auth0 ID (sub) from the decoded token
    const auth0Id = decodedToken.payload.sub;

    // Make a request to the Auth0 /userinfo endpoint to get user profile data
    const userInfoResponse = await axios.get(`${decodedToken.payload.iss}userinfo`, {
      headers: {
        Authorization: `Bearer ${token}`, // Pass the access token in the Authorization header
      },
    });

    // Extract email and name from the user info response
    const { email, name } = userInfoResponse.data;
    
    console.log(email);

    if (!email || !name) {
      return res.status(400).json({ message: 'User profile information is incomplete.' });
    }

    // Attach the user info to the request object for downstream use
    req.user = { auth0Id, email, name };

    // Check if the user exists in the database
    let user = await User.findOne({ auth0Id });
    let j = await Note.findOne();
    if (!user) {
      // Create a new user if not found
      user = new User({
        auth0Id,
        email,
        name,
        notes: [],
      });
      await user.save();
    }

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Error in authentication middleware:', error);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};