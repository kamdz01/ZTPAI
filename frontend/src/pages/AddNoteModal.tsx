import React, { useState } from 'react';

type AddNoteModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onAddNote: (noteTitle: string, noteContent: string) => void;
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
        <div className={`modal ${isOpen ? 'show-modal' : ''}`} style={{
            color: 'white',
            visibility: isOpen ? 'visible' : 'hidden',
            opacity: isOpen ? 1 : 0,
            position: 'fixed',
            zIndex: 1,
            width: '100%',
            height: '100%',
            transition: 'opacity 0.2s, visibility 0.2s, transform 0.3s',
            transform: isOpen ? 'translateY(0)' : 'translateY(10px)',
        }}>
            <div className="modal-content" style={{
                backgroundColor: '#040E00',
                margin: 'calc(1% + 70px) auto',
                padding: '30px',
                borderRadius: '15px',
                width: '80%',
                // height: '70%',
                height: 'fit-content',
            }}>
                <form id="new-note-form" className="new-note-form" onSubmit={handleAddNote}>
                    <button type="submit" className="submit-btn" style={{
                        float: 'left',
                        backgroundColor: '#303D2B',
                        padding: '5px 10px',
                        border: 'none',
                        borderRadius: '5px',
                        color: 'white',
                        marginBottom: '10px',
                    }}>Add Note</button>
                    <span id="close-modal-btn" className="close-btn" style={{
                        float: 'right',
                        padding: '0',
                        color: 'white',
                        fontSize: '28px',
                        fontWeight: 'bold',
                        marginBottom: '10px',
                        cursor: 'pointer',
                    }} onClick={onClose}>&times;</span>
                    <input type="text" id="note-title" className="note-title" name="note_title" placeholder="Note Title" required
                        value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)} style={{
                            padding: '10px',
                            width: 'calc(100% - 20px)',
                            backgroundColor: '#303D2B',
                            borderRadius: '5px',
                            border: 'none',
                            marginBottom: '10px',
                            color: 'white',
                        }} />
                    <textarea rows={10} id="note-content" className="note-content" name="note_content" placeholder="Note Content" required
                        value={noteContent} onChange={(e) => setNoteContent(e.target.value)} style={{
                            padding: '10px',
                            width: 'calc(100% - 20px)',
                            height: 'fit-content',
                            resize: 'none',
                            backgroundColor: '#303D2B',
                            borderRadius: '5px',
                            border: 'none',
                            color: 'white',
                        }}></textarea>
                    <input type="hidden" id="user-id" name="user_id" value="1" />
                    <input type="hidden" id="note-role-id" name="note_role_id" value="1" />
                    <input type="hidden" name="action" value="add" />
                </form>
            </div>
        </div>
    );
};

export default AddNoteModal;
