import React, { useState, useEffect } from 'react';

type ShareModalProps = {
    isOpen: boolean;
    onClose: () => void;
    noteId: number | null;
    onShare: (noteId: number, userToShare: string, role: number, onSuccess: () => void) => void;
};

type SharedUser = {
    id: number;
    user: string;
    noteRole: {
        id: number;
        name: string;
    };
};

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, noteId, onShare }) => {
    const [userToShare, setUserToShare] = useState('');
    const [role, setRole] = useState('');
    const [roles, setRoles] = useState<any[]>([]);
    const [sharedUsers, setSharedUsers] = useState<SharedUser[]>([]);

    useEffect(() => {
        if (noteId !== null) {
            // Fetch roles from the API
            fetch('http://localhost:8080/api/note-roles')
                .then(response => response.json())
                .then(data => {
                    setRoles(data);
                    if (data.length > 0) {
                        setRole(data[0].id); // Set the first role as the default
                    }
                })
                .catch(error => console.error('Error fetching roles:', error));

                fetchSharedUsers(noteId);
        }
    }, [noteId]);

    const fetchSharedUsers = (noteId: number) => {
        fetch(`http://localhost:8080/api/user-notes/users_for_note/${noteId}`)
            .then(response => response.json())
            .then(data => setSharedUsers(data))
            .catch(error => console.error('Error fetching shared users:', error));
    };

    const handleShare = () => {
        if (noteId !== null) {
            onShare(noteId, userToShare, role || roles[0].id, () => {
                // Fetch the updated list of shared users after sharing the note
                fetchSharedUsers(noteId);
                setUserToShare('');
                setRole(roles.length > 0 ? roles[0].id : '');
            });
        }
    };

    return (
        <div style={{ display: isOpen ? 'block' : 'none', position: 'fixed', zIndex: 1000, left: 0, top: 0, width: '100%', height: '100%', overflow: 'auto', backgroundColor: 'rgba(0,0,0,0.4)' }}>
            <div style={{ backgroundColor: '#303D2B', color: 'white', margin: '15% auto', padding: '20px', border: '1px solid #888', borderRadius: '10px', width: '80%' }}>
                <span style={{ float: 'right', cursor: 'pointer', color: 'white', fontSize: '20px' }} onClick={onClose}>&times;</span>
                <h2 style={{ marginTop: '0' }}>Share Note</h2>
                <div className="share-form">
                    <input type="hidden" id="share-note-id" value={noteId || ''} />
                    <label htmlFor="user-to-share">Share note with:</label>
                    <input
                        type="text"
                        id="user-to-share"
                        placeholder="Username"
                        value={userToShare}
                        onChange={(e) => setUserToShare(e.target.value)}
                        style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: 'none', backgroundColor: '#f1f1f1' }}
                    />
                    <label htmlFor="share-note-role">Role:</label>
                    <select
                        id="share-note-role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: 'none', backgroundColor: '#f1f1f1' }}
                    >
                        {roles.map((role) => (
                            <option key={role.id} value={role.id}>{role.name}</option>
                        ))}
                    </select>
                    <button
                        onClick={handleShare}
                        style={{ backgroundColor: '#031400', color: 'white', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}
                    >
                        Share Note
                    </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
                    <h4>Current Shared Users:</h4>
                    {sharedUsers.map(user => (
                        <div key={user.id} style={{ margin: '10px 0', padding: '10px', backgroundColor: '#404040', borderRadius: '5px' }}>
                            <p style={{ margin: '0' }}>User: {user.user}</p>
                            <p style={{ margin: '0' }}>Role: {user.noteRole.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShareModal;
