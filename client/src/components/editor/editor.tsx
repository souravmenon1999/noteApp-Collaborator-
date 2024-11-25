import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import NoteList from './noteList';
import EditorToolbar from './editorToolbar';
import { Note } from '../../types';
import { ChatContainer } from '../chatBot/chatContainer';
import ChatToggleButton from '../chatBot/chatToggleButton';
import { ChatProvider } from '../../context/ChatContext';
import ChatPopup from '../chatBot/ChatPopup';




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

  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleNoteChange = (newContent: string) => {
    if (currentNote) {
      currentNote.content = newContent;
      dispatch(setCurrentNote(currentNote));
      // Save the updated note to the backend via WebSocket or REST API
    }
  };

  return (
    <>

<div className="relative">
    <ChatToggleButton onClick={toggleChat} />
    
    {isChatOpen && (
      <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
        <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full h-[600px]">
          <ChatContainer />
          <button
            onClick={toggleChat}
            className="absolute top-4 right-4 text-white text-lg"
          >
            X
          </button>
        </div>
      </div>
    )}
  </div>

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
  
<ChatPopup/>
    </>

    
  );
};

export default Editor;
