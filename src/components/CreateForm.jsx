import { useState } from "react";

import supabase from "../services/supabaseClient.js";

import Swatch from "./Swatch.jsx";
import Table from "./Table.jsx";

function CreateForm({ setModal }) {
  const [deck, setDeck] = useState({
    name: "",
    colour: "red",
  });
  const [cards, setCards] = useState([
    { front: "", back: "", selected: false },
  ]);
  const [submitClicked, setSubmitClicked] = useState(false);

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
      let newDeckId = null;
      try {
        const { data, error } = await supabase
          .from("decks")
          .insert(deck)
          .select();
        if (error) throw error;
        newDeckId = data[0].deck_id;
      } catch (error) {
        console.error(error.message);
      }
      try {
        const cardsWithoutSelectedProperty = cards.map((card) => ({
          front: card.front,
          back: card.back,
        }));
        const cardsWithForeignKey = cardsWithoutSelectedProperty.map(
          (card) => ({
            ...card,
            deck_id: newDeckId,
          })
        );
        const { error } = await supabase
          .from("cards")
          .insert(cardsWithForeignKey);
        if (error) throw error;
      } catch (error) {
        console.error(error.message);
      }
      window.location.reload();
    }
  }

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <div className="mb-8 grid grid-cols-2 gap-8">
        <div>
          <label className="mb-4 block font-medium" htmlFor="name">
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
        <div>
          <fieldset>
            <legend className="mb-4 block font-medium">Colours</legend>
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
          Create
        </button>
      </div>
    </form>
  );
}

export default CreateForm;
