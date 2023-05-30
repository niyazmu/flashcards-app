import { useState } from "react";

import Modal from "./Modal.jsx";
import CreateForm from "./CreateForm.jsx";

function Header({ decks }) {
  const [modal, setModal] = useState(false);

  return (
    <>
      <header>
        <button className="" onClick={() => setModal(true)}>
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
