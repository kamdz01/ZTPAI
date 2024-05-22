import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TopBar from './topbar.tsx';
import {jwtDecode} from 'jwt-decode';
import EditModal from './EditModal.tsx';
import ShareModal from './ShareModal.tsx';
import { Note } from '../types.tsx';


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
    const location = useLocation();

    useEffect(() => {
        fetchNotes();
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
            })
            .catch(error => console.error('Error:', error));
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

        fetch(`http://localhost:8080/api/notes/${updatedNote.note_id}`, {
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
        <div style={{ backgroundColor: '#031400', color: '#E0FFDF', fontFamily: 'Arial', textAlign: 'center', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <TopBar onAddNote={fetchNotes} />
            <div style={{ width: '90%', maxWidth: '1200px' }}>
                <div style={{ position: 'absolute', top: '10px', left: '10px', width: '30px', height: '30px', backgroundColor: 'white', borderRadius: '15%', border: '1px solid #73AD21', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <a href="/"><h2>&lt;</h2></a>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', width: '100%' }}>
                        {notes.map((note) => (
                            <div key={note.note_id} style={{ backgroundColor: '#303D2B', color: 'white', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', padding: '15px', fontSize: '16px', minHeight: '150px', cursor: 'pointer' }} onClick={() => handleEditClick(note)}>
                                <h2>{note.note_title}</h2>
                                <p>{note.note_content}</p>
                                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between' }}>
                                    <button type="button" style={{ backgroundColor: '#031400', color: 'white', padding: '5px 10px', borderRadius: '5px', border: 'none' }} onClick={(e) => { e.stopPropagation(); handleShareClick(note); }}>Share</button>
                                    {note.note_role_id === 1 ? (
                                        <button type="button" style={{ backgroundColor: '#ff4d4d', color: 'white', padding: '5px 10px', borderRadius: '5px', border: 'none' }} onClick={(e) => { e.stopPropagation(); handleDeleteOrLeave(note.user_note_id, true); }}>Delete</button>
                                    ) : (
                                        <button type="button" style={{ backgroundColor: '#ff4d4d', color: 'white', padding: '5px 10px', borderRadius: '5px', border: 'none' }} onClick={(e) => { e.stopPropagation(); handleDeleteOrLeave(note.user_note_id, false); }}>Leave</button>
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
                <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} noteId={currentNote ? currentNote.note_id : null} onShare={handleShareNote} />
            )}
        </div>
    );
};

export default NotesPanel;
