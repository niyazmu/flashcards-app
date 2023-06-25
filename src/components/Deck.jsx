import { Link } from "react-router-dom";

import { useState } from "react";

import supabase from "../supabaseClient.js";

import Modal from "./Modal.jsx";
import SettingsForm from "./SettingsForm.jsx";

function Deck({ name, numberOfCards, colour, deck_id }) {
  const [modal, setModal] = useState(false);

  function handleEdit(event) {
    event.preventDefault();
    setModal(true);
  }

  async function handleDelete(event) {
    event.preventDefault();
    try {
      const { data, error } = await supabase
        .from("cards")
        .delete()
        .eq("deck_id", deck_id);
      if (error) throw error;
    } catch (error) {
      alert(error.message);
    }
    try {
      const { data, error } = await supabase
        .from("decks")
        .delete()
        .eq("deck_id", deck_id);
      if (error) throw error;
    } catch (error) {
      alert(error.message);
    }
    window.location.reload();
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
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              className="text-underline ml-2 text-white"
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
        <SettingsForm modal={modal} deck_id={deck_id} />
      </Modal>
    </>
  );
}
export default Deck;
