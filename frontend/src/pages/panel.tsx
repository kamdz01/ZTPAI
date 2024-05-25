import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TopBar from './topbar.tsx';
import {jwtDecode} from 'jwt-decode';
import EditModal from './EditModal.tsx';
import ShareModal from './ShareModal.tsx';
import { Note } from '../types.tsx';
import connectWebSocket from './WebSocket';

import '../css/panel.css';

function getUserIdFromToken(token: string): string | null {
    try {
        const decodedToken: any = jwtDecode(token);
        if (decodedToken && decodedToken.sub) {
            return decodedToken.id;
        }
        return null;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}

const NotesPanel = () => {
    const [notes, setUserNotes] = useState<Note[]>([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [currentNote, setCurrentNote] = useState<Note | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
    const location = useLocation();

    useEffect(() => {
        fetchNotes();
        const token = localStorage.getItem('auth_token');
        if (token) {
            const userId = getUserIdFromToken(token);
            const stompClient = connectWebSocket(userId, (message) => {
                console.log('Received message: ', message);
                fetchNotes(); // Fetch notes again when a new message is received
            });

            return () => {
                stompClient.deactivate();
            };
        }
    }, [location.pathname]);

    const fetchNotes = () => {
        const token = localStorage.getItem('auth_token');
        if (!token) {
            console.error("No token found");
            return;
        }
        const userId = getUserIdFromToken(token);

        const headers = {
            'Authorization': `Bearer ${token}`
        };

        fetch(`http://localhost:8080/api/users/${userId}`, { method: 'GET', headers: headers })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                const filteredNotes = response.userNotes.map((note: any) => ({
                    note_id: note.note.note_id,
                    note_title: note.note.note_title,
                    note_content: note.note.note_content,
                    note_role_id: note.noteRole.id,
                    user_note_id: note.id
                }));
                setUserNotes(filteredNotes);
                setFilteredNotes(filteredNotes);
            })
            .catch(error => console.error('Error:', error));
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (query === '') {
            setFilteredNotes(notes);
        } else {
            setFilteredNotes(notes.filter(note => 
                note.note_title.toLowerCase().includes(query.toLowerCase()) || 
                note.note_content.toLowerCase().includes(query.toLowerCase())
            ));
        }
    };
    

    const handleEditClick = (note: Note) => {
        setCurrentNote(note);
        setIsEditModalOpen(true);
    };

    const handleShareClick = (note: Note) => {
        setCurrentNote(note);
        setIsShareModalOpen(true);
    };

    const handleSaveNote = (updatedNote: Note) => {
        const token = localStorage.getItem('auth_token');
        if (!token) {
            console.error("No token found");
            return;
        }

        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        fetch(`http://localhost:8080/api/user-notes/note/${updatedNote.note_id}`, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify({
                note_title: updatedNote.note_title,
                note_content: updatedNote.note_content
            })
        })
            .then(response => response.json())
            .then(response => {
                if (response) {
                    const updatedNotes = notes.map(note => note.note_id === updatedNote.note_id ? updatedNote : note);
                    setUserNotes(updatedNotes);
                    setIsEditModalOpen(false);
                } else {
                    console.error('Failed to update note');
                }
            })
            .catch(error => console.error('Error:', error));
    };

    const handleShareNote = (noteId: number, userToShare: string, role: number, onSuccess: () => void) => {
        const token = localStorage.getItem('auth_token');
        if (!token) {
            console.error("No token found");
            return;
        }

        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        console.log(JSON.stringify({
            userId: userToShare,
            noteId: noteId,
            noteRoleId: role
        }));
        fetch(`http://localhost:8080/api/user-notes/note-role`, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify({
                userId: userToShare,
                noteId: noteId,
                noteRoleId: role
            })
        })
            .then(response => response.json())
            .then(data => {console.log(data); return data;})
            .then(data => {
                if (data) {
                    console.log('User added to note successfully');
                    onSuccess(); 
                    // Update the UI with shared users if needed
                } else {
                    console.error('Failed to add user to note');
                }
            })
            .catch(error => console.error('Error:', error));
    };
    const handleDeleteOrLeave = (userNoteId: number, isOwner: boolean) => {
        const confirmMessage = isOwner ? 'Are you sure you want to delete this note?' : 'Are you sure you want to leave this note?';
        if (!window.confirm(confirmMessage)) {
            return;
        }
        const token = localStorage.getItem('auth_token');
        if (!token) {
            console.error("No token found");
            return;
        }

        const headers = {
            'Authorization': `Bearer ${token}`
        };

        fetch(`http://localhost:8080/api/user-notes/${userNoteId}`, {
            method: 'DELETE',
            headers: headers
        })
            .then(response => {
                if (response.ok) {
                    setUserNotes(notes.filter(note => note.user_note_id !== userNoteId));
                } else {
                    console.error('Failed to delete or leave note');
                }
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <>
            <TopBar onAddNote={fetchNotes} onSearch={handleSearch} />
            <div className="container">
                <div className="content">
                    <div className="note-full">
                        <div className="note-grid">
                            {filteredNotes.map((note) => (
                                <div key={note.note_id} className="text-box" onClick={() => handleEditClick(note)}>
                                    <h2>{note.note_title}</h2>
                                    <p>{note.note_content}</p>
                                    <div className="button-container">
                                        <button type="button" className="share-button" onClick={(e) => { e.stopPropagation(); handleShareClick(note); }}>Share</button>
                                        {note.note_role_id === 1 ? (
                                            <button type="button" className="delete-button" onClick={(e) => { e.stopPropagation(); handleDeleteOrLeave(note.user_note_id, true); }}>Delete</button>
                                        ) : (
                                            <button type="button" className="leave-button" onClick={(e) => { e.stopPropagation(); handleDeleteOrLeave(note.user_note_id, false); }}>Leave</button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {isEditModalOpen && (
                    <EditModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} note={currentNote} onSave={handleSaveNote} />
                )}
                {isShareModalOpen && (
                    <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} noteId={currentNote ? currentNote.note_id : null} noteRoleId={currentNote ? currentNote.note_role_id : null} onShare={handleShareNote} />
                )}
            </div>
        </>
    );
};

export default NotesPanel;
