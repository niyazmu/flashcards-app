import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./components/HomePage.jsx";
import DeckPage from "./components/DeckPage.jsx";
import NotFoundPage from "./components/NotFoundPage.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:deck_id" element={<DeckPage />} exact />
          <Route path="/not-found" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
