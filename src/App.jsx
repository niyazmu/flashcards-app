import React, { useState } from "react";

import Modal from "./components/Modal.jsx";

function App() {
  const [modal, setModal] = useState(false);

  return (
    <>
      <button className="btn-primary" onClick={() => setModal(true)}>
        Open modal
      </button>
      <Modal heading="Modal" isVisible={modal} close={() => setModal(false)}>
        This is the modal content.
      </Modal>
    </>
  );
}

export default App;
