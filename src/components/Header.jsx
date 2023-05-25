import React, { useState } from "react";

import Modal from "./Modal.jsx";
import Swatch from "./Swatch.jsx";
import Table from "./Table.jsx";

function Header() {
  const [modal, setModal] = useState(false);
  const [deck, setDeck] = useState({
    deck_id: 1,
    name: "",
    colour: "bg-red-300",
  });
  const [cards, setCards] = useState([
    { card_id: 1, front: "", back: "", deck_id: 1, selected: false },
  ]);

  function handleChange(event) {
    const { name, value } = event.target;
    setDeck((prevDeckData) => {
      return {
        ...prevDeckData,
        [name]: value,
      };
    });
  }

  return (
    <>
      <header>
        <button className="btn-primary" onClick={() => setModal(true)}>
          Create deck
        </button>
      </header>
      <Modal
        heading="Create deck"
        isVisible={modal}
        close={() => setModal(false)}
      >
        <form>
          <div className="my-8 flex space-x-8">
            <div className="w-1/2">
              <label className="mb-2 block font-medium" htmlFor="name">
                Name
              </label>
              <input
                className="w-full rounded border p-2 focus:text-blue-500 focus:outline-blue-500"
                type="text"
                name="name"
                value={deck.name}
                onChange={handleChange}
              />
            </div>
            <div className="w-1/2">
              <fieldset>
                <legend className="mb-2 block font-medium">Colours</legend>
                <div className="flex flex-wrap gap-2">
                  <Swatch
                    colour="bg-red-300"
                    borderColour="border-red-100"
                    checked={deck.colour === "bg-red-300"}
                    handleChange={handleChange}
                  />
                  <Swatch
                    colour="bg-orange-300"
                    borderColour="border-orange-100"
                    checked={deck.colour === "bg-orange-300"}
                    handleChange={handleChange}
                  />
                  <Swatch
                    colour="bg-yellow-300"
                    borderColour="border-yellow-100"
                    checked={deck.colour === "bg-yellow-300"}
                    handleChange={handleChange}
                  />
                  <Swatch
                    colour="bg-green-300"
                    borderColour="border-green-100"
                    checked={deck.colour === "bg-green-300"}
                    handleChange={handleChange}
                  />
                  <Swatch
                    colour="bg-teal-300"
                    borderColour="border-teal-100"
                    checked={deck.colour === "bg-teal-300"}
                    handleChange={handleChange}
                  />
                  <Swatch
                    colour="bg-blue-300"
                    borderColour="border-blue-100"
                    checked={deck.colour === "bg-blue-300"}
                    handleChange={handleChange}
                  />
                  <Swatch
                    colour="bg-indigo-300"
                    borderColour="border-indigo-100"
                    checked={deck.colour === "bg-indigo-300"}
                    handleChange={handleChange}
                  />
                  <Swatch
                    colour="bg-purple-300"
                    borderColour="border-purple-100"
                    checked={deck.colour === "bg-purple-300"}
                    handleChange={handleChange}
                  />
                  <Swatch
                    colour="bg-pink-300"
                    borderColour="border-pink-100"
                    checked={deck.colour === "bg-pink-300"}
                    handleChange={handleChange}
                  />
                </div>
              </fieldset>
            </div>
          </div>
          <Table cards={cards} setCards={setCards} />
          <button className="mt-8 w-full rounded bg-blue-500 py-3 text-white">
            Create deck
          </button>
        </form>
      </Modal>
    </>
  );
}

export default Header;
