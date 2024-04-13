import React, { useState } from 'react';
import logo from '../images/logo2.png';

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

const Register: React.FC = () => {
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
        setter(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        console.log('Registering:', login, email, password);
    };

    return (
        <div style={styles.body}>
            <div style={styles.main}>
                <div style={styles.returnBtn}><a href="/"><h2>&lt;</h2></a></div>
                <div style={styles.column}>
                    <div style={styles.header}>Notility</div>
                    <img src={logo} alt="logo" style={{ width: '30%' }} />
                    <h3>Hello! Register to get started</h3>
                    <form onSubmit={handleSubmit}>
                        <input 
                            style={styles.input}
                            type="text"
                            name="login"
                            placeholder="Login"
                            value={login}
                            onChange={(e) => handleInputChange(e, setLogin)}
                        />
                        <input 
                            style={styles.input}
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => handleInputChange(e, setEmail)}
                        />
                        <input 
                            style={styles.input}
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => handleInputChange(e, setPassword)}
                        />
                        <input 
                            style={styles.input}
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => handleInputChange(e, setConfirmPassword)}
                        />
                        <button style={styles.button} type="submit">Register</button>
                    </form>
                    <p>Already have an account? <a href="login" style={styles.link}>Login Now</a></p>
                </div>
            </div>
        </div>
    );
};

export default Register;
