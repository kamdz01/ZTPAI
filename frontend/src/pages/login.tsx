import React, { useState } from 'react';
import logo from '../images/logo2.png';

// Styles defined as a JavaScript object
const styles = {
    body: {
        backgroundColor: "#031400",
        color: "#E0FFDF",
        fontFamily: "Arial",
        textAlign: "center" as const,
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    main: {
        width: "350px",
    },
    column: {
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
    },
    returnBtn: {
        position: "absolute" as const,
        top: "10px",
        left: "10px",
        width: "30px",
        height: "30px",
        backgroundColor: "white",
        borderRadius: "15%",
        border: "1px solid #73AD21",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    header: {
        color: "#E0FFDF",
        fontSize: "40px",
        fontWeight: "bold" as const,
        marginBottom: "20px",
    },
    input: {
        width: "100%",
        padding: "10px",
        margin: "10px 0",
        borderRadius: "5px",
    },
    button: {
        width: "100%",
        padding: "10px",
        backgroundColor: "#296F1D",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer" as const,
        marginTop: "20px",
    },
    link: {
        color: "#35C2C1",
        textDecoration: "underline",
        cursor: "pointer" as const,
        marginTop: "10px",
    }
};

// Login component with form handling
const Login: React.FC = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Login:', login, 'Password:', password);
    };

    return (
        <div style={styles.body}>
            <div style={styles.main}>
                <div style={styles.returnBtn}><a href="/"><h2>&lt;</h2></a></div>
                <div style={styles.column}>
                    <div style={styles.header}>Notility</div>
                    <img src={logo} alt="logo" style={{ width: '30%' }}/>
                    <h3>Welcome back!</h3>
                    <form onSubmit={handleSubmit}>
                        <input 
                            style={styles.input}
                            type="text"
                            placeholder="Login"
                            value={login}
                            onChange={handleLoginChange}
                        />
                        <input 
                            style={styles.input}
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <button style={styles.button} type="submit">Login</button>
                    </form>
                    <a href="forgotpass.php" style={styles.link}>Forgot password?</a>
                    <p>Don't have an account? <a href="register" style={styles.link}>Register Now</a></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
