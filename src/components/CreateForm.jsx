import { useState, useEffect } from "react";

import supabase from "../supabaseClient.js";

import Swatch from "./Swatch.jsx";
import Table from "./Table.jsx";

function CreateForm({ modal, decks }) {
  const [newDeck, setNewDeck] = useState({
    deck_id: null,
    name: "",
    colour: "red",
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
      prevNewCards.map((prevNewCard) => ({
        ...prevNewCard,
        deck_id: newDeckId,
      }))
    );
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setNewDeck((prevNewDeck) => {
      return {
        ...prevNewDeck,
        [name]: value,
      };
    });
  }

  function handleErrors(isDeckNameEmpty, isAnyCardEmpty) {
    if (isDeckNameEmpty) {
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

  async function handleSubmit(event) {
    event.preventDefault();
    const isAnyCardEmpty = newCards.some(
      (card) => card.front.trim() === "" || card.back.trim() === ""
    );
    const isDeckNameEmpty = newDeck.name.trim() === "";
    handleErrors(isDeckNameEmpty, isAnyCardEmpty);
    if (!isDeckNameEmpty && !isAnyCardEmpty) {
      try {
        const { data, error } = await supabase.from("decks").insert(newDeck);
        if (error) throw error;
      } catch (error) {
        alert(error.message);
      }
      try {
        const { data, error } = await supabase.from("cards").insert(newCards);
        if (error) throw error;
      } catch (error) {
        alert(error.message);
      }
      window.location.reload();
    }
  }

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <label className="mb-4 block font-medium" htmlFor="name">
            Name
          </label>
          <input
            className={`w-full rounded border p-3 ${
              nameError
                ? "border-red-500 focus:outline-red-500"
                : "border focus:outline-black "
            }`}
            type="text"
            name="name"
            value={newDeck.name}
            maxLength="36"
            onChange={handleChange}
          />
          {nameError && (
            <span className="text-sm italic text-red-500">
              * Please enter a name.
            </span>
          )}
        </div>
        <div>
          <fieldset>
            <legend className="mb-4 block font-medium">Colours</legend>
            <div className="flex flex-wrap gap-2">
              <Swatch
                colour="red"
                checked={newDeck.colour === "red"}
                handleChange={handleChange}
              />
              <Swatch
                colour="orange"
                checked={newDeck.colour === "orange"}
                handleChange={handleChange}
              />
              <Swatch
                colour="amber"
                checked={newDeck.colour === "amber"}
                handleChange={handleChange}
              />
              <Swatch
                colour="yellow"
                checked={newDeck.colour === "yellow"}
                handleChange={handleChange}
              />
              <Swatch
                colour="lime"
                checked={newDeck.colour === "lime"}
                handleChange={handleChange}
              />
              <Swatch
                colour="green"
                checked={newDeck.colour === "green"}
                handleChange={handleChange}
              />
              <Swatch
                colour="emerald"
                checked={newDeck.colour === "emerald"}
                handleChange={handleChange}
              />
              <Swatch
                colour="teal"
                checked={newDeck.colour === "teal"}
                handleChange={handleChange}
              />
              <Swatch
                colour="cyan"
                checked={newDeck.colour === "cyan"}
                handleChange={handleChange}
              />
              <Swatch
                colour="sky"
                checked={newDeck.colour === "sky"}
                handleChange={handleChange}
              />
              <Swatch
                colour="blue"
                checked={newDeck.colour === "blue"}
                handleChange={handleChange}
              />
              <Swatch
                colour="indigo"
                checked={newDeck.colour === "indigo"}
                handleChange={handleChange}
              />
              <Swatch
                colour="violet"
                checked={newDeck.colour === "violet"}
                handleChange={handleChange}
              />
              <Swatch
                colour="purple"
                checked={newDeck.colour === "purple"}
                handleChange={handleChange}
              />
              <Swatch
                colour="fuchsia"
                checked={newDeck.colour === "fuchsia"}
                handleChange={handleChange}
              />
              <Swatch
                colour="pink"
                checked={newDeck.colour === "pink"}
                handleChange={handleChange}
              />
              <Swatch
                colour="rose"
                checked={newDeck.colour === "rose"}
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
      <div className="mt-8 grid grid-cols-2 gap-4">
        <button
          className="rounded-md border border-black p-4"
          onClick={() => setModal(false)}
        >
          Cancel
        </button>
        <button className="rounded-md bg-black p-4 text-white">Create</button>
      </div>
    </form>
  );
}

export default CreateForm;
