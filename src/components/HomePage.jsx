import supabase from "../services/supabaseClient";

import { useState, useEffect } from "react";

import Modal from "./Modal.jsx";
import CreateForm from "./CreateForm.jsx";
import EditForm from "./EditForm.jsx";
import Deck from "./Deck.jsx";
import NotSupportedPage from "./NotSupportedPage.jsx";

function HomePage({ windowWidth }) {
  const [decks, setDecks] = useState([]);
  const [cards, setCards] = useState([]);
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedDeck, setSelectedDeck] = useState({ deck_id: null, name: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDecks, setFilteredDecks] = useState([]);

  const sortedDecks = decks.sort((a, b) => {
    const dateA = new Date(a.timestamp);
    const dateB = new Date(b.timestamp);
    return dateA - dateB;
  });

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
      console.error(error.message);
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
      console.error(error.message);
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
      {windowWidth >= 1024 ? (
        <>
          {/* When a modal is active, this is set to 'hidden', preventing the decks from causing a secondary overflow in the vertical direction. */}
          <div
            className={`container mx-auto px-8 2xl:px-16 ${
              createModal || editModal ? "hidden" : ""
            }`}
          >
            <header>
              <div className="my-16 flex justify-end">
                <button
                  onClick={() => setCreateModal(true)}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-black text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div className="mb-16">
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
                    className="h-10 w-10 2xl:h-12 2xl:w-12"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </div>
                <input
                  className="mt-2 w-full text-6xl  placeholder-gray-200 outline-none 2xl:text-7xl"
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Search flashcards..."
                />
              </div>
            </header>
            <main>
              <div className="mb-16 grid grid-cols-2 gap-8 2xl:grid-cols-3">
                {(searchQuery === "" ? sortedDecks : filteredDecks).map(
                  (deck) => (
                    <div key={deck.deck_id}>
                      <Deck
                        name={deck.name}
                        numberOfCards={countCards(deck.deck_id)}
                        colour={deck.colour}
                        deck_id={deck.deck_id}
                        setEditModal={setEditModal}
                        setSelectedDeck={setSelectedDeck}
                      />
                    </div>
                  )
                )}
              </div>
            </main>
          </div>
          <Modal
            heading={`EDIT: ${selectedDeck.name}`}
            isVisible={editModal}
            close={() => setEditModal(false)}
          >
            <EditForm
              modal={editModal}
              setModal={setEditModal}
              deck_id={selectedDeck.deck_id}
            />
          </Modal>
          <Modal
            heading="Create a new deck"
            isVisible={createModal}
            close={() => setCreateModal(false)}
          >
            <CreateForm setModal={setCreateModal} />
          </Modal>
        </>
      ) : (
        <NotSupportedPage />
      )}
    </>
  );
}

export default HomePage;
