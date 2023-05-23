import React, { useState } from "react";

import Modal from "./Modal.jsx";

function Header() {
  const [modal, setModal] = useState(false);

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
        <form></form>
      </Modal>
    </>
  );
}

export default Header;
