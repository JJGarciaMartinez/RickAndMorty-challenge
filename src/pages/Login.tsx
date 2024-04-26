import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateCredentials } from "validations/LoginValidation";
import Logo from "assets/icon-512x512.webp";
import styles from "pages/styles/Login.module.css";

interface LoginFormProps {
  onLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const validationError = validateCredentials(username, password);
    if (validationError) {
      setError(validationError);
      return;
    }
    if (username === "usuario" && password === "contraseña1") {
      onLogin();
      localStorage.setItem("isLoggedIn", "true");
      navigate("/");
    } else {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <span className={styles.main}>
      <div className={styles.container}>
        <header>
          <figure>
            <img src={Logo} alt="" />
          </figure>
          <h2>Login </h2>
        </header>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <div
              style={{
                color: "#fc2a46",
                fontSize: "1rem",
                fontWeight: "400",
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}
          <button type="submit">Sign in</button>
        </form>
      </div>

      <footer className={styles.footer}>
        <p>Use this credentials: usuario / contraseña1</p>
      </footer>
    </span>
  );
};

export default LoginForm;
