import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import NoteList from './noteList';
import EditorToolbar from './editorToolbar';
import { Note } from '../../types';



const Editor = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth0();
  const { currentNote } = useSelector((state: any) => state.note);

  useEffect(() => {
    if (isAuthenticated && user) {
      // Fetch the user's notes here
      // Dispatch to set the notes in the Redux store
    }
  }, [isAuthenticated, user]);

  const handleNoteChange = (newContent: string) => {
    if (currentNote) {
      currentNote.content = newContent;
      dispatch(setCurrentNote(currentNote));
      // Save the updated note to the backend via WebSocket or REST API
    }
  };

  return (
    <div className="editor-container flex h-screen">
    <div className="notes-list w-1/4 p-4 bg-gray-100">
      <NoteList />
    </div>
    <div className="editor-area flex flex-col w-3/4 p-4">
      <div className="editor-toolbar flex-shrink-0">
        <EditorToolbar />
      </div>
      <div
        className="note-editor flex-1 border border-gray-300 rounded-lg mt-4 p-4"
        contentEditable
        dangerouslySetInnerHTML={{ __html: currentNote ? currentNote.content : '' }}
        onInput={(e) => handleNoteChange(e.currentTarget.innerHTML)}
      />
    </div>
  </div>
  
  );
};

export default Editor;
