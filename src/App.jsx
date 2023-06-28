import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home.jsx";
import DeckPage from "./components/DeckPage.jsx";
import NotFoundPage from "./components/NotFoundPage.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:deck_id" element={<DeckPage />} exact />
          <Route path="/not-found" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
