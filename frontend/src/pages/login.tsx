import React, { useState } from 'react';
import logo from '../images/logo2.png';
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.tsx";
import { setAuthHeader } from "../services/BackendService.tsx";

import { handleAuthRequest } from "../auth/AuthRequest.tsx";


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
        width: "330px",
        padding: "10px",
        margin: "15px auto 5px auto",
        borderRadius: "5px",
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

const Login = () => {
  const [login, setUsername] = useState("kamdz");
  const [password, setPassword] = useState("kamdz");
  const { isAuthenticated } = useAuth();
  if (isAuthenticated()) {
    return <Navigate to="/main" />;
  }

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const login = data.get("login");
    const password = data.get("password");

    const result = await handleAuthRequest("login", { login, password });

    if (result.success) {
      setAuthHeader(result.data.token);
      window.location.href = "/main";
    } else {
      throw Error(result.error);
    }
  };

  return (
    <div style={styles.body}>
        <div style={styles.main}>
            <div style={styles.returnBtn}><a href="/"><h2>&lt;</h2></a></div>
            <div style={styles.column}>
                <div style={styles.header}>Notility</div>
                <img src={logo} alt="logo" style={{ width: '50%' }}/>
                <h3>Welcome back!</h3>
                <form onSubmit={handleLogin}>
                    <input 
                        style={styles.input}
                        type="text"
                        placeholder="Login"
                        id="login"
                        name="login"
                        autoComplete="login"
                        value={login}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input 
                        style={styles.input}
                        type="password"
                        placeholder="Password"
                        value={password}
                        id="password"
                        name="password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
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