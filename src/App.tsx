import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { CaretUp } from "@phosphor-icons/react";
import Favorites from "pages/Favorites";
import Navbar from "components/Nav/Navbar";
import Home from "pages/Home";
import LoginForm from "pages/Login";
import Locations from "pages/Locations";
import "./App.css";

function App() {
  const [showToTop, setShowToTop] = useState(false);

  const toTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowToTop(true);
      } else {
        setShowToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Navbar />

      <div className={`to-top ${showToTop ? "show" : ""}`}>
        <button onClick={toTop}>
          <CaretUp size={25} />
        </button>
      </div>
      <main className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/locations" element={<Locations />} />

          <Route path="/login" element={<LoginForm onLogin={() => {}} />} />

          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
