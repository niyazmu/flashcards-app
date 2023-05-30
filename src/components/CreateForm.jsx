import { useState, useEffect } from "react";

import Swatch from "./Swatch.jsx";
import Table from "./Table.jsx";

function CreateForm({ modal, decks }) {
  const [newDeck, setNewDeck] = useState({
    deck_id: null,
    name: "",
    colour: "bg-red-300",
  });
  const [newCards, setNewCards] = useState([
    { front: "", back: "", deck_id: null, selected: false },
  ]);
  const [nameError, setNameError] = useState(false);
  const [cardError, setCardError] = useState(false);

  useEffect(() => {
    getNextDeckId();
  }, [modal]);

  function getNextDeckId() {
    const lastDeckIndex = decks.length - 1;
    const isDecksEmpty = decks.length === 0;
    const newDeckId = isDecksEmpty ? 1 : decks[lastDeckIndex].deck_id + 1;
    setNewDeck((prevNewDeck) => ({
      ...prevNewDeck,
      deck_id: newDeckId,
    }));
    setNewCards((prevNewCards) =>
      prevNewCards.map((card) => ({
        ...card,
        deck_id: newDeckId,
      }))
    );
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setNewDeck((prevNewDeckData) => {
      return {
        ...prevNewDeckData,
        [name]: value,
      };
    });
  }

  function handleErrors() {
    const isAnyCardEmpty = newCards.some(
      (card) => card.front.trim() === "" || card.back.trim() === ""
    );
    if (newDeck.name.trim() === "") {
      setNameError(true);
    } else {
      setNameError(false);
    }
    if (isAnyCardEmpty) {
      setCardError(true);
    } else {
      setCardError(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    handleErrors();
  }

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <div className="my-8 flex space-x-8">
        <div className="w-1/2">
          <label className="mb-2 block font-medium" htmlFor="name">
            Name
          </label>
          <input
            className={`w-full rounded border p-3 ${
              nameError
                ? "border-red-500 focus:outline-red-500"
                : "border focus:outline-blue-500 "
            }`}
            type="text"
            name="name"
            value={newDeck.name}
            maxLength="32"
            onChange={handleChange}
          />
          {nameError && (
            <span className="text-sm italic text-red-500">
              * Please enter a name.
            </span>
          )}
        </div>
        <div className="w-1/2">
          <fieldset>
            <legend className="mb-2 block font-medium">Colours</legend>
            <div className="flex flex-wrap gap-2">
              <Swatch
                colour="bg-red-300"
                borderColour="border-red-100"
                checked={newDeck.colour === "bg-red-300"}
                handleChange={handleChange}
              />
              <Swatch
                colour="bg-orange-300"
                borderColour="border-orange-100"
                checked={newDeck.colour === "bg-orange-300"}
                handleChange={handleChange}
              />
              <Swatch
                colour="bg-yellow-300"
                borderColour="border-yellow-100"
                checked={newDeck.colour === "bg-yellow-300"}
                handleChange={handleChange}
              />
              <Swatch
                colour="bg-green-300"
                borderColour="border-green-100"
                checked={newDeck.colour === "bg-green-300"}
                handleChange={handleChange}
              />
              <Swatch
                colour="bg-teal-300"
                borderColour="border-teal-100"
                checked={newDeck.colour === "bg-teal-300"}
                handleChange={handleChange}
              />
              <Swatch
                colour="bg-blue-300"
                borderColour="border-blue-100"
                checked={newDeck.colour === "bg-blue-300"}
                handleChange={handleChange}
              />
              <Swatch
                colour="bg-indigo-300"
                borderColour="border-indigo-100"
                checked={newDeck.colour === "bg-indigo-300"}
                handleChange={handleChange}
              />
              <Swatch
                colour="bg-purple-300"
                borderColour="border-purple-100"
                checked={newDeck.colour === "bg-purple-300"}
                handleChange={handleChange}
              />
              <Swatch
                colour="bg-pink-300"
                borderColour="border-pink-100"
                checked={newDeck.colour === "bg-pink-300"}
                handleChange={handleChange}
              />
            </div>
          </fieldset>
        </div>
      </div>
      <Table
        cards={newCards}
        setCards={setNewCards}
        cardError={cardError}
        deck_id={newDeck.deck_id}
      />
      <button className="mt-8 w-full rounded bg-blue-500 p-4 text-white">
        Create flashcards
      </button>
    </form>
  );
}

export default CreateForm;
