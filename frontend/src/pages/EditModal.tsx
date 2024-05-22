import React, { useState, useEffect } from 'react';
import { Note } from '../types';

type EditModalProps = {
    isOpen: boolean;
    onClose: () => void;
    note: Note | null;
    onSave: (note: Note) => void;
};

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, note, onSave }) => {
    const [noteTitle, setNoteTitle] = useState('');
    const [noteContent, setNoteContent] = useState('');

    useEffect(() => {
        if (note) {
            setNoteTitle(note.note_title);
            setNoteContent(note.note_content);
        }
    }, [note]);

    const handleSave = () => {
        if (note) {
            onSave({ ...note, note_title: noteTitle, note_content: noteContent });
        }
    };

    return (
        <div style={{ display: isOpen ? 'block' : 'none', position: 'fixed', zIndex: 1000, left: 0, top: 0, width: '100%', height: '100%', overflow: 'auto', backgroundColor: 'rgba(0,0,0,0.4)' }}>
            <div style={{ backgroundColor: '#303D2B', color: 'white', margin: '15% auto', padding: '20px', border: '1px solid #888', borderRadius: '10px', width: '80%' }}>
                <span style={{ float: 'right', cursor: 'pointer', color: 'white', fontSize: '20px' }} onClick={onClose}>&times;</span>
                <h2 style={{ marginTop: '0' }}>Edit Note</h2>
                <input type="text" value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)} placeholder="Note Title" required style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: 'none', backgroundColor: '#f1f1f1' }} />
                <textarea rows={10} value={noteContent} onChange={(e) => setNoteContent(e.target.value)} placeholder="Note Content" required style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: 'none', backgroundColor: '#f1f1f1' }}></textarea>
                <button onClick={handleSave} style={{ backgroundColor: '#031400', color: 'white', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Save</button>
            </div>
        </div>
    );
};

export default EditModal;
