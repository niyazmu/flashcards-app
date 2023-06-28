import supabase from "../supabaseClient";

import { useState, useEffect } from "react";

import Header from "./Header.jsx";
import Deck from "./Deck.jsx";

function Home() {
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

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDecks, setFilteredDecks] = useState([]);

  function countCards(deck_id) {
    const filteredCards = cards.filter((card) => card.deck_id === deck_id);
    const numberOfCards = filteredCards.length;
    return numberOfCards;
  }

  function handleSearch(event) {
    const query = event.target.value;
    setSearchQuery(query);

    const filtered = decks.filter((deck) =>
      deck.name.toLowerCase().startsWith(query.toLowerCase())
    );
    setFilteredDecks(filtered);
  }

  return (
    <>
      <div className="container mx-auto">
        <Header decks={decks} />
        <>
          <main>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search decks..."
            />

            <div className="grid grid-cols-4 gap-8">
              {(filteredDecks.length === 0 ? decks : filteredDecks).map(
                (deck) => (
                  <div key={deck.deck_id}>
                    <Deck
                      name={deck.name}
                      numberOfCards={countCards(deck.deck_id)}
                      colour={deck.colour}
                      deck_id={deck.deck_id}
                    />
                  </div>
                )
              )}
            </div>
          </main>
        </>
      </div>
    </>
  );
}

export default Home;
