import { Link } from "react-router-dom";

import { useState } from "react";

import Modal from "./Modal.jsx";
import SettingsForm from "./SettingsForm.jsx";

function Deck({ name, numberOfCards, colour, deck_id }) {
  const [modal, setModal] = useState(false);

  function handleEdit(event) {
    event.preventDefault();
    setModal(true);
  }

  return (
    <>
      <Link to={`/${deck_id}`} key={deck_id.toString()}>
        <div className={`bg-${colour}-400 rounded-xl p-8`}>
          <h1 className="mb-16 text-xl font-semibold text-white">{name}</h1>
          <div className="flex items-center justify-between">
            <div className="text-white">{numberOfCards} cards</div>
            <button
              className="text-underline ml-auto text-white"
              onClick={handleEdit}
            >
              Edit
            </button>
          </div>
        </div>
      </Link>

      <Modal
        heading={`${name} settings`}
        isVisible={modal}
        close={() => setModal(false)}
      >
        <SettingsForm modal={modal} />
      </Modal>
    </>
  );
}
export default Deck;
