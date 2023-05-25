import supabase from "../../supabaseClient";

import { useState, useEffect } from "react";

import Deck from "./Deck.jsx";

function Main() {
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

  function countCards(deck_id) {
    const filteredCards = cards.filter((card) => card.deck_id === deck_id);
    const numberOfCards = filteredCards.length;
    return numberOfCards;
  }

  return (
    <>
      <main>
        {decks.map((deck) => (
          <Deck
            key={deck.deck_id}
            name={deck.name}
            numberOfCards={countCards(deck.deck_id)}
            colour={deck.colour}
          />
        ))}
      </main>
    </>
  );
}

export default Main;
