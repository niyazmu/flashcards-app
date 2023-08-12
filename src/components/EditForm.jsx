import { useState, useEffect } from "react";

import supabase from "../services/supabaseClient.js";

import Swatch from "./Swatch.jsx";
import Table from "./Table.jsx";

function EditForm({ modal, setModal, deck_id }) {
  const [deck, setDeck] = useState({
    deck_id: null,
    name: "",
    colour: "",
  });
  const [cards, setCards] = useState([]);
  const [deletedCardsIds, setDeletedCardsIds] = useState([]);
  const [submitClicked, setSubmitClicked] = useState(false);

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
      console.error(error.message);
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
        data.forEach((obj) => {
          obj.selected = false;
        });
        setCards(data);
      }
    } catch (error) {
      console.error(error.message);
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

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitClicked(true);
    const isAnyCardEmpty = cards.some(
      (card) => card.front.trim() === "" || card.back.trim() === ""
    );
    const isDeckNameEmpty = deck.name.trim() === "";
    if (!isDeckNameEmpty && !isAnyCardEmpty) {
      try {
        const { error } = await supabase
          .from("decks")
          .update(deck)
          .eq("deck_id", deck_id);
        if (error) throw error;
      } catch (error) {
        console.error(error.message);
      }
      try {
        const { error } = await supabase
          .from("cards")
          .delete()
          .in("card_id", deletedCardsIds);
        if (error) throw error;
      } catch (error) {
        console.error(error.message);
      }
      const cardsWithoutSelectedProperty = cards.map((card) => ({
        ...(card.card_id ? { card_id: card.card_id } : {}), // If the 'card_id' exists, add the 'card_id' property along with its value; otherwise, do not add the property to the 'card' for 'upsert'.
        front: card.front,
        back: card.back,
        deck_id: card.deck_id,
      }));
      for (const card of cardsWithoutSelectedProperty) {
        try {
          const { error } = await supabase
            .from("cards")
            .upsert([card], { onConflict: ["card_id"] });
          if (error) throw error;
        } catch (error) {
          console.error(error.message);
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
              submitClicked && deck.name.trim() === ""
                ? "border-red-500 focus:outline-red-500"
                : "border focus:outline-black"
            }`}
            type="text"
            name="name"
            value={deck.name}
            maxLength="36"
            onChange={handleChange}
          />
          {submitClicked && deck.name.trim() === "" ? (
            <span className="text-sm italic text-red-500">
              * Please enter a name.
            </span>
          ) : null}
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
        deck_id={deck.deck_id}
        setDeletedCardsIds={setDeletedCardsIds}
        submitClicked={submitClicked}
      />
      <div className="mt-8 grid grid-cols-2 gap-4">
        <button
          type="button"
          className="rounded-md border border-black p-4"
          onClick={() => setModal(false)}
        >
          Cancel
        </button>
        <button type="submit" className="rounded-md bg-black p-4 text-white">
          Save
        </button>
      </div>
    </form>
  );
}

export default EditForm;
