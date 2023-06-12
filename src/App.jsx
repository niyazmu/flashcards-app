import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home.jsx";
import DeckPage from "./components/DeckPage.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Home />}></Route>
          <Route path=":id" element={<DeckPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
