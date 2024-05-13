import React, { useState } from 'react';
import logo from '../images/logo2.png';
import { handleAuthRequest } from '../auth/AuthRequest.tsx';
import { setAuthHeader } from '../services/BackendService.tsx';

const API_URL: string = "http://localhost:8080";

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
        width: "330px",
        padding: "10px",
        margin: "15px auto 5px auto",
        borderRadius: "5px",
    },
    error: {
        color: "red"
    },
    button: {
        width: "350px",
        padding: "10px",
        backgroundColor: "#296F1D",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer" as const,
        margin: "15px auto 5px auto",
    },
    link: {
        color: "#35C2C1",
        textDecoration: "underline",
        cursor: "pointer" as const,
        marginTop: "10px",
    }
};

const Register: React.FC = () => {
    const [error, setError] = useState("");

  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const login = data.get("login");
      const email = data.get("email");
      const password = data.get("password");
      const confirmPassword = data.get("confirmPassword");
  
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      try {
        const response = await fetch(`${API_URL}/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ login, email, password }),
        });
  
        if (!response.ok) throw new Error("Signup failed");
        const result = await handleAuthRequest("login", { login, password });

        if (result.success) {
          setAuthHeader(result.data.token);
          window.location.href = "/main";
        } else {
          throw Error(result.error);
        }
      } catch (error) {
        setError("Signup failed. Please try again.");
      }
    };
  

    return (
        <div style={styles.body}>
            <div style={styles.main}>
                <div style={styles.returnBtn}><a href="/"><h2>&lt;</h2></a></div>
                <div style={styles.column}>
                    <div style={styles.header}>Notility</div>
                    <img src={logo} alt="logo" style={{ width: '50%' }} />
                    <h3>Hello! Register to get started</h3>
                    <form onSubmit={handleSubmit}>
                        <input 
                            style={styles.input}
                            required
                            id="login"
                            name="login"
                            placeholder="Login"
                            autoComplete="login"
                            autoFocus
                        />
                        <input 
                            style={styles.input}
                            type="text"
                            required
                            name="email"
                            placeholder="Email"
                            id="email"
                            autoComplete="email"
                        />
                        <input 
                            style={styles.input}
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                            id="password"
                            autoComplete="password"
            
                        />
                        <input 
                            style={styles.input}
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm password"
                            required
                            id="confirm_password"
                        />
                            <h2 style={styles.error}>{error}</h2>
                        <button style={styles.button} type="submit">Register</button>
                    </form>
                    <p>Already have an account? <a href="login" style={styles.link}>Login Now</a></p>
                </div>
            </div>
        </div>
    );
};

export default Register;
