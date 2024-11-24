export interface Note {
    id: string; // Unique identifier for the note
    title: string; // Title of the note
    content: string; // Content of the note (could be HTML or plain text)
    createdAt: Date; // Creation timestamp
    updatedAt: Date; // Last update timestamp
    owner: string; // User ID of the note's owner
    collaborators: Collaborator[]; // List of collaborators with their access levels
  }
  
  export type AccessLevel = 'read' | 'write' | 'admin';
  
  export interface Collaborator {
    userId: string; // Unique identifier for the collaborator
    accessLevel: AccessLevel; // Access level for the note
  }
  
  // Define the user type for authenticated users
  export interface User {
    id: string; // Unique identifier for the user
    name: string; // Full name of the user
    email: string; // Email of the user
    avatar?: string; // Optional avatar URL for the user
  }
  
  // Redux state type for notes
  export interface NoteState {
    notes: Note[]; // List of notes
    currentNote: Note | null; // The currently selected note
  }
  
  // Redux state type for authentication
  export interface AuthState {
    user: User | null; // Currently authenticated user
    isAuthenticated: boolean; // Authentication status
    isLoading: boolean; // Loading state for authentication
  }
  