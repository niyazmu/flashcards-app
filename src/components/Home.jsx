import supabase from "../supabaseClient";

import { useState, useEffect } from "react";

import Modal from "./Modal.jsx";
import CreateForm from "./CreateForm.jsx";
import Deck from "./Deck.jsx";

function Home() {
  const [decks, setDecks] = useState([]);
  const [cards, setCards] = useState([]);
  const [modal, setModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDecks, setFilteredDecks] = useState([]);

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

  function handleSearch(event) {
    const query = event.target.value;
    setSearchQuery(query);
    const filtered = decks.filter((deck) =>
      deck.name.toLowerCase().startsWith(query.toLowerCase())
    );
    setFilteredDecks(filtered);
  }

  function countCards(deck_id) {
    const filteredCards = cards.filter((card) => card.deck_id === deck_id);
    const numberOfCards = filteredCards.length;
    return numberOfCards;
  }

  return (
    <>
      <div className="container mx-auto">
        <header>
          <div className="mt-12 flex justify-end">
            <button
              onClick={() => setModal(true)}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-black text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-6 w-6"
              >
                <path
                  d="M12 4.5v15m7.5-7.5h-15"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="mb-16 mt-12">
            <div
              className={`${
                searchQuery !== "" ? "text-black" : "text-gray-200"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-12 w-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
            <input
              className="mt-2 w-full text-7xl placeholder-gray-200 outline-none"
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search flashcards..."
            />
          </div>
        </header>
        <main>
          <div className="grid grid-cols-4 gap-8">
            {(searchQuery === "" ? decks : filteredDecks).map((deck) => (
              <div key={deck.deck_id}>
                <Deck
                  name={deck.name}
                  numberOfCards={countCards(deck.deck_id)}
                  colour={deck.colour}
                  deck_id={deck.deck_id}
                />
              </div>
            ))}
          </div>
        </main>
      </div>
      <Modal
        heading="Create flashcards"
        isVisible={modal}
        close={() => setModal(false)}
      >
        <CreateForm modal={modal} decks={decks} />
      </Modal>
    </>
  );
}

export default Home;
