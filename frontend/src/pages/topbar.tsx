import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import person from '../images/person-placeholder-image.png';
import { jwtDecode } from 'jwt-decode';
import AddNoteModal from './AddNoteModal.tsx';

import '../css/topbar.css';

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
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Search..."
                    onChange={(e) => onSearch(e.target.value)}
                    ref={searchInputRef}
                    id="search-input"
                />
                <span id="clear-search" onClick={clearSearch}>&times;</span>
            </div>
            <div className="topbar-mobile"></div>
            <div className="topbar">
                <div className="topbar-icons">
                    <a href="panel">
                        <span className="material-icons">home</span>
                    </a>
                    <a onClick={() => setIsAddNoteModalOpen(true)}>
                        <span className="material-icons">add_circle</span>
                    </a>
                    <a>
                        <span className="material-icons inactive">favorite</span>
                    </a>
                    <a>
                        <span className="material-icons inactive">settings</span>
                    </a>
                </div>
            </div>
            <div className="topbar-icons-right">
                <img onClick={togglePersonMenu} src={person} alt="User" className="person-img" />
            </div>
            {isPersonMenuOpen && (
                    <div className="person-context show-modal">
                        {userRole === 1 && (
                            <a href="admin">
                                <div className="person-btn">Admin</div>
                            </a>
                        )}
                        <a onClick={handleLogout}>
                            <div className="person-btn">Logout</div>
                        </a>
                    </div>
                )}
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
