import React, { useState, useEffect } from 'react';
import TopBar from './topbar.tsx';
import { jwtDecode } from "jwt-decode";

type Note = {
    note_id: number;
    note_title: string;
    note_content: string;
    note_role_id: string;
};

function getUserIdFromToken(token: string): string | null {
    try {
      const decodedToken: any = jwtDecode(token); // Decoded token can be of any type
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

    useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
        console.error("No token found");
        return;
    }
    const userId = getUserIdFromToken(token);
    console.log(userId);



    const headers = {
        'Authorization': `Bearer ${token}`  // Prepare the Authorization header
    };

    console.log(token);

    fetch(`http://localhost:8080/api/users/${userId}`, { method: 'GET', headers: headers })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            return response;
        })
        .then(userData => {
            const filteredNotes = userData.userNotes.map((note: any) => {
                return {
                    note_id: note.note.note_id,
                    note_title: note.note.note_title,
                    note_content: note.note.note_content,
                    noteRole_id: note.noteRole.id
                };
            });
            setUserNotes(filteredNotes);
        })
        .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div style={{ backgroundColor: '#031400', color: '#E0FFDF', fontFamily: 'Arial', textAlign: 'center', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <TopBar />
            <div style={{ width: '90%', maxWidth: '1200px' }}>
                <div style={{ position: 'absolute', top: '10px', left: '10px', width: '30px', height: '30px', backgroundColor: 'white', borderRadius: '15%', border: '1px solid #73AD21', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <a href="/"><h2>&lt;</h2></a>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', width: '100%' }}>
                        {notes.map((note) => (
                            <div key={note.note_id} style={{ backgroundColor: '#303D2B', color: 'white', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', padding: '15px', fontSize: '16px', minHeight: '150px' }}>
                                <h2>{note.note_title}</h2>
                                <p>{note.note_content}</p>
                                {note.note_role_id === "1" && (
                                    <button type="button" style={{ backgroundColor: '#031400', color: 'white', padding: '5px 10px', borderRadius: '5px', border: 'none', marginTop: 'auto', display: 'block' }}>Edit</button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotesPanel;
