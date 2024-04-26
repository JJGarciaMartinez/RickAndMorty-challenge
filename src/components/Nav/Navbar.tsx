import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "assets/icon-512x512.webp";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn === "true") {
      setIsLoggedIn(true);
    }
  });

  const reloadPage = () => {
    window.location.reload();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    reloadPage();
    navigate("/");
  };
  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.brand_container}>
          <Link className={styles.brand_link} to="/">
            <figure>
              <img src={Logo} alt="Logo" />
            </figure>
            <p>Rick and Morty API</p>
          </Link>
        </div>

        <div className={styles.navbar_links}>
          <Link className="navbar-brand" to="/">
            Characters
          </Link>
          <Link className="navbar-brand" to="/locations">
            Locations
          </Link>
          <Link className="navbar-brand" to="/favorites">
            Favorites
          </Link>
          {isLoggedIn ? (
            <button onClick={handleLogout}>Log out</button>
          ) : (
            <Link className="navbar-brand" to="/login">
              Login
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}
