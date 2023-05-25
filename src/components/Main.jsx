import supabase from "../../supabaseClient";

import { useState, useEffect } from "react";

import Deck from "./Deck.jsx";

function Main() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    fetchDecks();
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

  return (
    <>
      <main>
        {decks.map((deck) => (
          <Deck
            key={deck.deck_id}
            name={deck.name}
            numberOfCards="0"
            colour={deck.colour}
          />
        ))}
      </main>
    </>
  );
}

export default Main;
