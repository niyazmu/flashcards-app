import { useState } from "react";

import Modal from "./Modal.jsx";
import CreateForm from "./CreateForm.jsx";

function Header({ decks }) {
  const [modal, setModal] = useState(false);

  return (
    <>
      <header className="my-8 flex items-center gap-4">
        <input
          className="flex-grow rounded-full border p-5 pl-8 outline-blue-500"
          type="text"
          maxLength="32"
        />
        <button
          className="ml-auto rounded-full bg-blue-500 px-12 py-5 text-white"
          onClick={() => setModal(true)}
        >
          Create flashcards
        </button>
      </header>
      <Modal
        heading="Create flashcards"
        isVisible={modal}
        close={() => setModal(false)}
      >
        <CreateForm modal={modal} decks={decks} />
      </Modal>
    </>
  );
}

export default Header;
