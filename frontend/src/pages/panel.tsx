import React from 'react';
import TopBar from './topbar.tsx';

type Note = {
    note_id: number;
    note_title: string;
    note_content: string;
    note_role_id: string;
};

const notes: Note[] = [
    { note_id: 1, note_title: "First Note", note_content: "This is the first note content...", note_role_id: "2" },
    { note_id: 2, note_title: "Second Note", note_content: "Content of the second note goes here...", note_role_id: "2" },
    { note_id: 3, note_title: "Third Note", note_content: "Here is the third note's content...", note_role_id: "2" },
    { note_id: 4, note_title: "Fourth Note", note_content: "Fourth note content here...", note_role_id: "2" },
    { note_id: 5, note_title: "Fifth Note", note_content: "Fifth note's content...", note_role_id: "2" },
    { note_id: 6, note_title: "Sixth Note", note_content: "Content for the sixth note...", note_role_id: "2" }
];

const NotesPanel: React.FC = () => {
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
