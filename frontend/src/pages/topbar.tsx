import React, { useState, useEffect } from 'react';
import person from '../images/person-placeholder-image.png';

const TopBar: React.FC = () => {
    const [userId, setUserId] = useState<number | null>(null);
    const [userRole, setUserRole] = useState<number | null>(null);
    const [userImg, setUserImg] = useState<string>('');

    useEffect(() => {
        setUserId(1);
        setUserRole(1);
        setUserImg('../images/person-placeholder-image.png');
    }, []);

    const handleLogout = () => {
        console.log('Logging out...');
    };

    return (
        <div style={{
            width: '100%', height: '70px', backgroundColor: '#040E00', display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', padding: '0 10px', position: 'fixed', zIndex: 3, top: 0, borderBottomLeftRadius: '15px',
            borderBottomRightRadius: '15px'
        }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                 <input type="text" placeholder="Search..." style={{ flexGrow: 1, maxWidth: '350px', padding: '10px', margin: '10px', borderRadius: '15px' }} />
                 <span style={{ cursor: 'pointer', color: '#aaa', marginLeft: '-30px', zIndex: 5 }}>&times;</span>
             </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <a href="panel" style={{ textDecoration: 'none' }}>
                    <span style={{ color: 'white', fontSize: '30px', cursor: 'pointer', margin: '0 10px' }} className="material-icons">home</span>
                </a>
                <a style={{ textDecoration: 'none' }}>
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
                <img src={person} alt="User" style={{ height: '35px', borderRadius: '50%', border: '4px solid #296F1D', marginRight: '10px' }} />
            </div>
        </div>
    );
};
 
export default TopBar;
