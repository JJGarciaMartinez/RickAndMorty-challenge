import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useSession = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [redirectLogin, setRedirectLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  const redirectToLogin = () => {
    setRedirectLogin(true);
  };

  useEffect(() => {
    if (redirectLogin) {
      navigate("/login");
    }
  }, [redirectLogin, navigate]);

  return { isLoggedIn, handleLogout, redirectToLogin, setRedirectLogin };
};

export default useSession;
