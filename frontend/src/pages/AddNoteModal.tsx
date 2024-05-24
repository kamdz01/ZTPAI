import React, { useState } from 'react';

type AddNoteModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onAddNote: (noteTitle: string, noteContent: string) => void;
};

const styles = {
    modal: {
        color: 'white',
        visibility: 'hidden' as const,
        opacity: 0,
        position: 'fixed' as const,
        zIndex: 1,
        width: '100%',
        height: '100%',
        transition: 'opacity 0.2s, visibility 0.2s, transform 0.3s',
        transform: 'translateY(10px)',
    },
    modalOpen: {
        visibility: 'visible' as const,
        opacity: 1,
        transform: 'translateY(0)',
    },
    modalContent: {
        backgroundColor: '#040E00',
        margin: 'calc(1% + 70px) auto',
        padding: '30px',
        borderRadius: '15px',
        width: '80%',
        height: 'fit-content',
    },
    submitBtn: {
        float: 'left' as const,
        backgroundColor: '#303D2B',
        padding: '5px 10px',
        border: 'none' as const,
        borderRadius: '5px',
        color: 'white',
        marginBottom: '10px',
    },
    closeBtn: {
        float: 'right' as const,
        padding: '0',
        color: 'white',
        fontSize: '28px',
        fontWeight: 'bold' as const,
        marginBottom: '10px',
        cursor: 'pointer' as const,
    },
    input: {
        padding: '10px',
        width: 'calc(100% - 20px)',
        backgroundColor: '#303D2B',
        borderRadius: '5px',
        border: 'none' as const,
        marginBottom: '10px',
        color: 'white',
    },
    textarea: {
        padding: '10px',
        width: 'calc(100% - 20px)',
        height: 'fit-content',
        resize: 'none' as const,
        backgroundColor: '#303D2B',
        borderRadius: '5px',
        border: 'none' as const,
        color: 'white',
    }
};

const AddNoteModal: React.FC<AddNoteModalProps> = ({ isOpen, onClose, onAddNote }) => {
    const [noteTitle, setNoteTitle] = useState('');
    const [noteContent, setNoteContent] = useState('');

    const handleAddNote = (event: React.FormEvent) => {
        event.preventDefault();
        onAddNote(noteTitle, noteContent);
        setNoteTitle('');
        setNoteContent('');
    };

    return (
        <div style={{ ...styles.modal, ...(isOpen ? styles.modalOpen : {}) }}>
        <div style={styles.modalContent}>
            <form id="new-note-form" className="new-note-form" onSubmit={handleAddNote}>
                <button type="submit" style={styles.submitBtn}>Add Note</button>
                <span style={styles.closeBtn} onClick={onClose}>&times;</span>
                <input
                    type="text"
                    id="note-title"
                    className="note-title"
                    name="note_title"
                    placeholder="Note Title"
                    required
                    value={noteTitle}
                    onChange={(e) => setNoteTitle(e.target.value)}
                    style={styles.input}
                />
                <textarea
                    rows={10}
                    id="note-content"
                    className="note-content"
                    name="note_content"
                    placeholder="Note Content"
                    required
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    style={styles.textarea}
                ></textarea>
                <input type="hidden" id="user-id" name="user_id" value="1" />
                <input type="hidden" id="note-role-id" name="note_role_id" value="1" />
                <input type="hidden" name="action" value="add" />
            </form>
        </div>
    </div>
);
};

export default AddNoteModal;
