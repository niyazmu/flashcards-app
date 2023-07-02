import { useState, useEffect } from "react";

import supabase from "../supabaseClient.js";

import Swatch from "./Swatch.jsx";
import Table from "./Table.jsx";

function SettingsForm({ modal, deck_id }) {
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);
  const [nameError, setNameError] = useState(false);
  const [cardError, setCardError] = useState(false);
  const [deletedCardsIds, setDeletedCardsIds] = useState([]);

  useEffect(() => {
    fetchDeck();
    fetchCards();
  }, [modal]);

  async function fetchDeck() {
    try {
      const { data, error } = await supabase
        .from("decks")
        .select("*")
        .eq("deck_id", deck_id);
      if (error) throw error;
      if (data != null) {
        setDeck(data[0]);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  async function fetchCards() {
    try {
      const { data, error } = await supabase
        .from("cards")
        .select("*")
        .eq("deck_id", deck_id);
      if (error) throw error;
      if (data != null) {
        setCards(data);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setDeck((prevDeck) => {
      return {
        ...prevDeck,
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
    const isAnyCardEmpty = cards.some(
      (card) => card.front.trim() === "" || card.back.trim() === ""
    );
    const isDeckNameEmpty = deck.name.trim() === "";
    handleErrors(isDeckNameEmpty, isAnyCardEmpty);
    if (!isDeckNameEmpty && !isAnyCardEmpty) {
      try {
        const { data, error } = await supabase
          .from("decks")
          .update(deck)
          .eq("deck_id", deck_id);
        if (error) throw error;
      } catch (error) {
        alert(error.message);
      }
      try {
        const { data, error } = await supabase
          .from("cards")
          .delete()
          .in("card_id", deletedCardsIds);
        if (error) throw error;
      } catch (error) {
        alert(error.message);
      }
      for (const card of cards) {
        try {
          const { data, error } = await supabase
            .from("cards")
            .upsert([card], { onConflict: ["card_id"] });
          if (error) throw error;
        } catch (error) {
          alert(error.message);
        }
      }
      window.location.reload();
    }
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
                : "border focus:outline-black "
            }`}
            type="text"
            name="name"
            value={deck.name}
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
                colour="red"
                checked={deck.colour === "red"}
                handleChange={handleChange}
              />
              <Swatch
                colour="orange"
                checked={deck.colour === "orange"}
                handleChange={handleChange}
              />
              <Swatch
                colour="amber"
                checked={deck.colour === "amber"}
                handleChange={handleChange}
              />
              <Swatch
                colour="yellow"
                checked={deck.colour === "yellow"}
                handleChange={handleChange}
              />
              <Swatch
                colour="lime"
                checked={deck.colour === "lime"}
                handleChange={handleChange}
              />
              <Swatch
                colour="green"
                checked={deck.colour === "green"}
                handleChange={handleChange}
              />
              <Swatch
                colour="emerald"
                checked={deck.colour === "emerald"}
                handleChange={handleChange}
              />
              <Swatch
                colour="teal"
                checked={deck.colour === "teal"}
                handleChange={handleChange}
              />
              <Swatch
                colour="cyan"
                checked={deck.colour === "cyan"}
                handleChange={handleChange}
              />
              <Swatch
                colour="sky"
                checked={deck.colour === "sky"}
                handleChange={handleChange}
              />
              <Swatch
                colour="blue"
                checked={deck.colour === "blue"}
                handleChange={handleChange}
              />
              <Swatch
                colour="indigo"
                checked={deck.colour === "indigo"}
                handleChange={handleChange}
              />
              <Swatch
                colour="violet"
                checked={deck.colour === "violet"}
                handleChange={handleChange}
              />
              <Swatch
                colour="purple"
                checked={deck.colour === "purple"}
                handleChange={handleChange}
              />
              <Swatch
                colour="fuchsia"
                checked={deck.colour === "fuchsia"}
                handleChange={handleChange}
              />
              <Swatch
                colour="pink"
                checked={deck.colour === "pink"}
                handleChange={handleChange}
              />
              <Swatch
                colour="rose"
                checked={deck.colour === "rose"}
                handleChange={handleChange}
              />
            </div>
          </fieldset>
        </div>
      </div>
      <Table
        cards={cards}
        setCards={setCards}
        cardError={cardError}
        deck_id={deck.deck_id}
        setDeletedCardsIds={setDeletedCardsIds}
      />
      <div className="mb-16 mt-8 flex flex-col gap-2 sm:flex-row">
        <button
          className="w-1/2 rounded-md border border-black p-4"
          onClick={() => setModal(false)}
        >
          Cancel
        </button>
        <button className="mt-2 w-1/2 rounded-md bg-black p-4 text-white sm:ml-2 sm:mt-0">
          Save
        </button>
      </div>
    </form>
  );
}

export default SettingsForm;
