import supabase from "../supabaseClient";

import { useState, useEffect } from "react";

import Modal from "./Modal.jsx";
import CreateForm from "./CreateForm.jsx";
import SettingsForm from "./SettingsForm.jsx";
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
      {windowWidth >= 1024 ? (
        <>
          {/* It's set to hidden so when the modal is active the user cannot see the decks too. */}
          <div
            className={`container mx-auto px-8 ${
              createModal || editModal ? "hidden" : ""
            }`}
          >
            <header>
              <div className="my-8 flex justify-end lg:my-16">
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
                    className="md:h-10 md:w-10 xl:h-12 xl:w-12 h-8 w-8 2xl:h-12 2xl:w-12"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </div>
                <input
                  className="xl:text-6xl mt-2 w-full text-4xl placeholder-gray-200 outline-none lg:text-6xl 2xl:text-7xl"
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Search flashcards..."
                />
              </div>
            </header>
            <main>
              <div className="xl:grid-cols-2 mb-16 grid gap-8 lg:grid-cols-2 2xl:grid-cols-3">
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
            <SettingsForm modal={editModal} deck_id={selectedDeck.deck_id} />
          </Modal>
          <Modal
            heading="Create a new deck"
            isVisible={createModal}
            close={() => setCreateModal(false)}
          >
            <CreateForm
              modal={createModal}
              setModal={setCreateModal}
              decks={decks}
            />
          </Modal>
        </>
      ) : (
        <NotSupportedPage />
      )}
    </>
  );
}

export default HomePage;
