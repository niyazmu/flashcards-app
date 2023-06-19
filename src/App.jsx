import supabase from "./supabaseClient";

import { useState, useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home.jsx";
import DeckPage from "./components/DeckPage.jsx";

function App() {
  const [decks, setDecks] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetchDecks();
    fetchCards();
  }, []);

  async function fetchDecks() {
    try {
      const { data, error } = await supabase.from("decks").select("*");
      if (error) throw error;
      if (data != null) {
        setDecks(data);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  async function fetchCards() {
    try {
      const { data, error } = await supabase.from("cards").select("*");
      if (error) throw error;
      if (data != null) {
        setCards(data);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Home decks={decks} cards={cards} />}></Route>
          <Route path=":deck_id" element={<DeckPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
