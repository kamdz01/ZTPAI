import React, { useState, useEffect, useCallback } from 'react';
import TopBar from './topbar.tsx';

type User = {
    user_id: number;
    login: string;
    email: string;
    role: Role;
};

type Role = {
    role_id: number;
    role_name: string;
};

const AdminPanel: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [roles, setRoles] = useState<Role[]>([]);
    const [searchInput, setSearchInput] = useState('');
    const [newRoleId, setNewRoleId] = useState<number | null>(null);
    const [currentRole, setCurrentRole] = useState<string>('');


    const getToken = () => {
        const token = localStorage.getItem('auth_token');
        if (!token) {
            console.error("No token found");
            return null;
        }
        return token;
    };


    const fetchRoles = useCallback(() => {
        const token = getToken();
        if (!token) return;

        fetch('http://localhost:8080/api/roles', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((roles: Role[]) => {
                setRoles(roles);
                if (roles.length > 0) {
                    setNewRoleId(roles[0].role_id);
                }
            })
            .catch((error) => console.error('Error:', error));
    }, []);

    const handleSearch = () => {
        const token = getToken();
        if (!token) return;

        fetch(`http://localhost:8080/api/users/${searchInput}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
            .then((response) => {
                if (!(response.status === 200)) {
                    alert('User not found');
                    throw new Error("User not found");
                }
                else {
                return response;
                }
            })
            .then((response) => response.json())
            .then((user: User) => {
                if (user) {
                    setUser(user);
                    setCurrentRole(user.role.role_name);
                } else {
                    alert('User not found');
                    setUser(null);
                }
            })
            .catch((error) => console.error('Error:', error));
    };

    const handleUpdateRole = () => {
        if (!user || newRoleId === null) return;
        
        const token = getToken();
        if (!token) return;
        fetch(`http://localhost:8080/api/users/role/${user.user_id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({role_id: newRoleId })
        })
            .then((response) => response.json())
            .then((user: User) => {
                if (user.role.role_id === newRoleId) {
                    setCurrentRole(roles.find((role) => role.role_id === newRoleId)?.role_name || '');
                } else {
                    alert('Failed to update user role');
                }
            })
            .catch((error) => console.error('Error:', error));
    };

    const handleDeleteUser = () => {
        if (!user) return;

        const token = getToken();
        if (!token) return;
        if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            fetch(`http://localhost:8080/api/users/${searchInput}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
                .then((data) => {
                    if (data.ok) {
                        setSearchInput('');
                        setUser(null);
                    } else {
                        alert('Failed to delete user');
                    }
                })
                .catch((error) => console.error('Error:', error));
        }
    };

    useEffect(() => {
        fetchRoles();
    }, [fetchRoles]);

    return (
        <div style={{ backgroundColor: '#031400', color: '#E0FFDF', fontFamily: 'Arial', textAlign: 'center', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <TopBar onAddNote={() => {}} onSearch={() => {}} />
            <div>
                <h2>Update User Role</h2>

                <div style={{ marginBottom: '20px' }}>
                    <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Username or email"
                        style={{ padding: '10px', backgroundColor: '#303D2B', borderRadius: '5px', border: 'none', color: 'white', margin: '0 10px' }}
                    />
                    <button onClick={handleSearch} style={{ backgroundColor: '#303D2B', padding: '10px', borderRadius: '5px', border: 'none', color: 'white' }}>
                        Search
                    </button>
                </div>
            </div>
            {user && (
                <div style={{ backgroundColor: '#040E00', padding: '20px', borderRadius: '10px', width: 'fit-content' }}>
                    <p>Username: <span style={{ fontWeight: 'bold' }}>{user.login}</span></p>
                    <p>Email: <span style={{ fontWeight: 'bold' }}>{user.email}</span></p>
                    <p>Current Role: <span style={{ fontWeight: 'bold' }}>{currentRole}</span></p>
                    <div>
                        <label htmlFor="role-select">New Role:</label>
                        <select
                            id="role-select"
                            value={newRoleId || ''}
                            onChange={(e) => setNewRoleId(parseInt(e.target.value))}
                            style={{ padding: '5px', backgroundColor: '#303D2B', border: 'none', borderRadius: '5px', color: 'white', marginLeft: '10px' }}
                        >
                            {roles.map((role) => (
                                <option key={role.role_id} value={role.role_id}>{role.role_name}</option>
                            ))}
                        </select>
                        <button onClick={handleUpdateRole} style={{ backgroundColor: '#303D2B', padding: '5px', borderRadius: '5px', border: 'none', color: 'white', marginLeft: '10px' }}>
                            Update Role
                        </button>
                    </div>
                    <div>
                        <button onClick={handleDeleteUser} style={{ backgroundColor: '#303D2B', padding: '5px', borderRadius: '5px', border: 'none', color: 'white', marginTop: '10px' }}>
                            Delete User
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
