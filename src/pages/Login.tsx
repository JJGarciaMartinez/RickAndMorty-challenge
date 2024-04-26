import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateCredentials } from "validations/LoginValidation";
import Logo from "assets/icon-512x512.webp";
import styles from "pages/styles/Login.module.css";
import { Eye, EyeClosed } from "@phosphor-icons/react";

interface LoginFormProps {
  onLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

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

  const seePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
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
            placeholder="User"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <span className={styles.password}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="button" onClick={seePassword}>
              {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
            </button>
          </span>

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
          <button className={styles.submit} type="submit">
            Sign in
          </button>
        </form>
      </div>

      <footer className={styles.footer}>
        <p>Use this credentials: usuario / contraseña1</p>
      </footer>
    </span>
  );
};

export default LoginForm;
