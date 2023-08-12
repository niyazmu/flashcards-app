import { useState, useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./components/HomePage.jsx";
import DeckPage from "./components/DeckPage.jsx";
import NotFoundPage from "./components/NotFoundPage.jsx";

function App() {
  const [windowWidth, setWindowWidth] = useState();

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function handleResize() {
    setWindowWidth(window.innerWidth);
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage windowWidth={windowWidth} />} />
          <Route
            path="/:deck_id"
            element={<DeckPage windowWidth={windowWidth} />}
            exact
          />
          <Route path="/not-found" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
