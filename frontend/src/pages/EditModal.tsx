import React, { useState, useEffect } from 'react';
import { Note } from '../types';

type EditModalProps = {
    isOpen: boolean;
    onClose: () => void;
    note: Note | null;
    onSave: (note: Note) => void;
};

const styles = {
    modal: {
        display: 'none' as const,
        position: 'fixed' as const,
        zIndex: 1000,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        overflow: 'auto' as const,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    modalOpen: {
        display: 'block' as const,
    },
    modalContent: {
        backgroundColor: '#303D2B',
        color: 'white',
        margin: '15% auto',
        padding: '20px',
        border: '1px solid #888',
        borderRadius: '10px',
        width: '80%',
    },
    closeBtn: {
        float: 'right' as const,
        cursor: 'pointer' as const,
        color: 'white',
        fontSize: '20px',
    },
    header: {
        marginTop: '0',
    },
    input: {
        width: 'calc(100% - 20px)',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '5px',
        border: 'none' as const,
        backgroundColor: '#f1f1f1',
    },
    textarea: {
        width: 'calc(100% - 20px)',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '5px',
        border: 'none' as const,
        backgroundColor: '#f1f1f1',
    },
    button: {
        backgroundColor: '#031400',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none' as const,
        cursor: 'pointer' as const,
    },
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
        <div style={{ ...styles.modal, ...(isOpen ? styles.modalOpen : {}) }}>
            <div style={styles.modalContent}>
                <span style={styles.closeBtn} onClick={onClose}>&times;</span>
                <h2 style={styles.header}>Edit Note</h2>
                <input
                    type="text"
                    value={noteTitle}
                    onChange={(e) => setNoteTitle(e.target.value)}
                    placeholder="Note Title"
                    required
                    style={styles.input}
                />
                <textarea
                    rows={10}
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    placeholder="Note Content"
                    required
                    style={styles.textarea}
                ></textarea>
                <button onClick={handleSave} style={styles.button}>Save</button>
            </div>
        </div>

    );
};

export default EditModal;
