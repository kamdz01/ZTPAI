import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import person from '../images/person-placeholder-image.png';
import { jwtDecode } from 'jwt-decode';
import AddNoteModal from './AddNoteModal.tsx';

type TopBarProps = {
    onAddNote: () => void;
    onSearch: (query: string) => void;
};

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

function getUserRoleFromToken(token: string): string | null {
    try {
        const decodedToken: any = jwtDecode(token);
        if (decodedToken && decodedToken.sub) {
            return decodedToken.role;
        }
        return null;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}

const TopBar: React.FC<TopBarProps> = ({ onAddNote, onSearch }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [userId, setUserId] = useState<number | null>(null);
    const [userRole, setUserRole] = useState<number | null>(null);
    const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);
    const [isPersonMenuOpen, setIsPersonMenuOpen] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const clearSearch = () => {
        if (searchInputRef.current) {
            searchInputRef.current.value = '';
            onSearch('');
        }
    };


    const togglePersonMenu = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsPersonMenuOpen(!isPersonMenuOpen);
    };

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            const userIdFromToken = getUserIdFromToken(token);
            if (userIdFromToken) {
                setUserId(parseInt(userIdFromToken));
            }
            const userRoleFromToken = getUserRoleFromToken(token);
            if (userRoleFromToken) { 
                setUserRole(parseInt(userRoleFromToken));
            }
        }
    }, []);

    const handleLogout = () => {
        console.log('Logging out...');
        localStorage.removeItem('auth_token');
        window.location.reload();
    };

    const handleAddNote = (noteTitle: string, noteContent: string) => {
        if (!userId) {
            console.error("User ID not found");
            return;
        }

        const token = localStorage.getItem('auth_token');
        if (!token) {
            console.error("No token found");
            return;
        }

        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        const body = JSON.stringify({
            note: {
                note_title: noteTitle,
                note_content: noteContent
            },
            noteRole: {
                id: 1
            },
            user: {
                id: userId
            }
        });

        fetch(`http://localhost:8080/api/user-notes`, {
            method: 'POST',
            headers: headers,
            body: body
        })
            .then(response => response.json())
            .then(response => {
                if (response) {
                    setIsAddNoteModalOpen(false);
                    console.log('Note added successfully');
                    if (location.pathname === '/panel') {
                        onAddNote();
                    } else {
                        navigate('/panel');
                    }
                    console.log('Note added successfully');
                } else {
                    console.error('Failed to add note');
                }
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <>
        <div style={{
            width: '100%', height: '70px', backgroundColor: '#040E00', display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', padding: '0 10px', position: 'fixed', zIndex: 3, top: 0, borderBottomLeftRadius: '15px',
            borderBottomRightRadius: '15px'
        }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <input
                        type="text"
                        placeholder="Search..."
                        onChange={(e) => onSearch(e.target.value)}
                        ref={searchInputRef}
                        style={{ flexGrow: 1, maxWidth: '350px', padding: '10px', margin: '10px', borderRadius: '15px' }}
                    />
                 <span onClick={clearSearch} style={{ cursor: 'pointer', color: '#aaa', marginLeft: '-30px', zIndex: 5 }}>&times;</span>
             </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <a href="panel" style={{ textDecoration: 'none' }}>
                    <span style={{ color: 'white', fontSize: '30px', cursor: 'pointer', margin: '0 10px' }} className="material-icons">home</span>
                </a>
                <a style={{ textDecoration: 'none' }} onClick={() => setIsAddNoteModalOpen(true)}>
                        <span style={{ color: 'white', fontSize: '30px', cursor: 'pointer', margin: '0 10px' }} className="material-icons">add_circle</span>
                    </a>
                <a style={{ textDecoration: 'none' }}>
                    <span style={{ color: 'gray', fontSize: '30px', cursor: 'pointer', margin: '0 10px' }} className="material-icons">favorite</span>
                </a>
                <a style={{ textDecoration: 'none' }}>
                    <span style={{ color: 'gray', fontSize: '30px', cursor: 'pointer', margin: '0 10px' }} className="material-icons">settings</span>
                </a>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '100%' }}>
                <img onClick={togglePersonMenu} src={person} alt="User" style={{ height: '35px', borderRadius: '50%', border: '4px solid #296F1D', marginRight: '10px' }} />
            </div>
            {isPersonMenuOpen && (
                    <div style={{
                        padding: '0 10px',
                        backgroundColor: '#1d201c',
                        borderRadius: '10px',
                        opacity: 1,
                        position: 'fixed',
                        top: '70px',
                        right: '10px',
                        visibility: 'visible',
                        transition: 'opacity 0.2s, visibility 0.2s, transform 0.3s',
                        transform: 'translateY(0)',
                        zIndex: 5
                    }}>
                        {userRole === 1 && (
                            <a href="admin" style={{ textDecoration: 'none' }}><div style={{
                                backgroundColor: '#303D2B',
                                padding: '5px 10px',
                                borderRadius: '5px',
                                color: 'white',
                                margin: '10px 0'
                            }}>Admin</div></a>
                        )}
                        <a onClick={handleLogout} style={{ textDecoration: 'none' }}><div style={{
                            backgroundColor: '#303D2B',
                            padding: '5px 10px',
                            borderRadius: '5px',
                            color: 'white',
                            margin: '10px 0'
                        }}>Logout</div></a>
                    </div>
                )}
        </div>
        {isAddNoteModalOpen && (
            <AddNoteModal
                isOpen={isAddNoteModalOpen}
                onClose={() => setIsAddNoteModalOpen(false)}
                onAddNote={handleAddNote}
            />
        )}
        </>
    );
};
 
export default TopBar;
