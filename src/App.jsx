import supabase from "./supabaseClient";

import { useState, useEffect } from "react";

import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";

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
      <div className="container mx-auto">
        <Header decks={decks} />
        <Main decks={decks} cards={cards} />
      </div>
    </>
  );
}

export default App;
