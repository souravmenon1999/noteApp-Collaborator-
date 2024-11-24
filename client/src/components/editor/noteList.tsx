// src/components/NoteList.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotes } from '../../redux/slices/notesSlice';
import { RootState } from '../../redux/store';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const NoteList: React.FC = () => {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  // Access notes and loading state from Redux store
  const { notes, status, error } = useSelector((state: RootState) => state.note);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getAccessTokenSilently();
        dispatch(fetchNotes(token)); // Dispatch the async thunk to fetch notes
      } catch (err) {
        console.error('Error fetching token:', err);
      }
    };

    if (status === 'idle') {
      fetchData();
    }
  }, []);

  if (status === 'loading') {
    return <div>Loading notes...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  // Ensure notes is an array before calling .map
  const renderNotes = Array.isArray(notes) ? (
    notes.map((note) => (
      <li key={note.id}>
        <Link to={`/notes/${note.id}`}>
          <h3>{note.title}</h3>
          <p>Access Level: {note.accessLevel}</p>
        </Link>
      </li>
    ))
  ) : (
    <p>No notes available</p>
  );

  return (
    <div className="notes-list">
      <h2>Your Notes</h2>
      <ul>
        {renderNotes}
      </ul>
    </div>
  );
};

export default NoteList;
