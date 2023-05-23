import React, { useState } from "react";

import Modal from "./Modal.jsx";

function Header() {
  const [modal, setModal] = useState(false);
  const [deck, setDeck] = useState({});

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
        </form>
      </Modal>
    </>
  );
}

export default Header;
