import React, { useState } from "react";

import Modal from "./Modal.jsx";
import Swatch from "./Swatch.jsx";

function Header() {
  const [modal, setModal] = useState(false);
  const [deck, setDeck] = useState({
    name: "",
    colour: "",
  });

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
                    checked={deck.colour === "bg-red-300"}
                    handleChange={handleChange}
                  />
                  <Swatch
                    colour="bg-orange-300"
                    checked={deck.colour === "bg-orange-300"}
                    handleChange={handleChange}
                  />
                  <Swatch
                    colour="bg-yellow-300"
                    checked={deck.colour === "bg-yellow-300"}
                    handleChange={handleChange}
                  />
                  <Swatch
                    colour="bg-green-300"
                    checked={deck.colour === "bg-green-300"}
                    handleChange={handleChange}
                  />
                  <Swatch
                    colour="bg-teal-300"
                    checked={deck.colour === "bg-teal-300"}
                    handleChange={handleChange}
                  />
                  <Swatch
                    colour="bg-blue-300"
                    checked={deck.colour === "bg-blue-300"}
                    handleChange={handleChange}
                  />
                  <Swatch
                    colour="bg-indigo-300"
                    checked={deck.colour === "bg-indigo-300"}
                    handleChange={handleChange}
                  />
                  <Swatch
                    colour="bg-purple-300"
                    checked={deck.colour === "bg-purple-300"}
                    handleChange={handleChange}
                  />
                  <Swatch
                    colour="bg-pink-300"
                    checked={deck.colour === "bg-pink-300"}
                    handleChange={handleChange}
                  />
                </div>
              </fieldset>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default Header;
