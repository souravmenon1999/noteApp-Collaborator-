import React from 'react';


const EditorToolbar = () => {
  const handleBoldClick = () => {
    document.execCommand('bold');
  };

  return (
    <div className="editor-toolbar">
      <button onClick={handleBoldClick}>Bold</button>
      {/* Add other editor tools here (italic, underline, etc.) */}
    </div>
  );
};

export default EditorToolbar;
