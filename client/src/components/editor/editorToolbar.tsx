import React from 'react';


const EditorToolbar = () => {
  const handleBoldClick = () => {
    document.execCommand('bold');
  };

  return (
    <div className="editor-toolbar">
      <button onClick={handleBoldClick}>Bold</button>
     
    </div>
  );
};

export default EditorToolbar;
