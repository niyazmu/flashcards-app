import React, { useState } from "react";

import Modal from "./Modal.jsx";

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
                  <label
                    htmlFor="red"
                    className={`${
                      deck.colour === "bg-red-300"
                        ? "border-4 border-red-100"
                        : "border-0"
                    } flex h-10 w-10 bg-red-300`}
                  >
                    <input
                      className="hidden"
                      type="radio"
                      id="red"
                      name="colour"
                      value="bg-red-300"
                      checked={deck.colour === "bg-red-300"}
                      onChange={handleChange}
                    />
                  </label>
                  <label
                    htmlFor="orange"
                    className={`${
                      deck.colour === "bg-orange-300"
                        ? "border-4 border-orange-100"
                        : "border-0"
                    } flex h-10 w-10 bg-orange-300`}
                  >
                    <input
                      className="hidden"
                      type="radio"
                      id="orange"
                      name="colour"
                      value="bg-orange-300"
                      checked={deck.colour === "bg-orange-300"}
                      onChange={handleChange}
                    />
                  </label>
                  <label
                    htmlFor="yellow"
                    className={`${
                      deck.colour === "bg-yellow-300"
                        ? "border-4 border-yellow-100"
                        : "border-0"
                    } flex h-10 w-10 bg-yellow-300`}
                  >
                    <input
                      className="hidden"
                      type="radio"
                      id="yellow"
                      name="colour"
                      value="bg-yellow-300"
                      checked={deck.colour === "bg-yellow-300"}
                      onChange={handleChange}
                    />
                  </label>
                  <label
                    htmlFor="green"
                    className={`${
                      deck.colour === "bg-green-300"
                        ? "border-4 border-green-100"
                        : "border-0"
                    } flex h-10 w-10 bg-green-300`}
                  >
                    <input
                      className="hidden"
                      type="radio"
                      id="green"
                      name="colour"
                      value="bg-green-300"
                      checked={deck.colour === "bg-green-300"}
                      onChange={handleChange}
                    />
                  </label>
                  <label
                    htmlFor="teal"
                    className={`${
                      deck.colour === "bg-teal-300"
                        ? "border-4 border-teal-100"
                        : "border-0"
                    } flex h-10 w-10 bg-teal-300`}
                  >
                    <input
                      className="hidden"
                      type="radio"
                      id="teal"
                      name="colour"
                      value="bg-teal-300"
                      checked={deck.colour === "bg-teal-300"}
                      onChange={handleChange}
                    />
                  </label>
                  <label
                    htmlFor="blue"
                    className={`${
                      deck.colour === "bg-blue-300"
                        ? "border-4 border-blue-100"
                        : "border-0"
                    } flex h-10 w-10 bg-blue-300`}
                  >
                    <input
                      className="hidden"
                      type="radio"
                      id="blue"
                      name="colour"
                      value="bg-blue-300"
                      checked={deck.colour === "bg-blue-300"}
                      onChange={handleChange}
                    />
                  </label>
                  <label
                    htmlFor="indigo"
                    className={`${
                      deck.colour === "bg-indigo-300"
                        ? "border-4 border-indigo-100"
                        : "border-0"
                    } flex h-10 w-10 bg-indigo-300`}
                  >
                    <input
                      className="hidden"
                      type="radio"
                      id="indigo"
                      name="colour"
                      value="bg-indigo-300"
                      checked={deck.colour === "bg-indigo-300"}
                      onChange={handleChange}
                    />
                  </label>
                  <label
                    htmlFor="purple"
                    className={`${
                      deck.colour === "bg-purple-300"
                        ? "border-4 border-purple-100"
                        : "border-0"
                    } flex h-10 w-10 bg-purple-300`}
                  >
                    <input
                      className="hidden"
                      type="radio"
                      id="purple"
                      name="colour"
                      value="bg-purple-300"
                      checked={deck.colour === "bg-purple-300"}
                      onChange={handleChange}
                    />
                  </label>
                  <label
                    htmlFor="pink"
                    className={`${
                      deck.colour === "bg-pink-300"
                        ? "border-4 border-pink-100"
                        : "border-0"
                    } flex h-10 w-10 bg-pink-300`}
                  >
                    <input
                      className="hidden"
                      type="radio"
                      id="pink"
                      name="colour"
                      value="bg-pink-300"
                      checked={deck.colour === "bg-pink-300"}
                      onChange={handleChange}
                    />
                  </label>
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
