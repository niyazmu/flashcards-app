import supabase from "../../supabaseClient";

import Deck from "./Deck.jsx";

function Main() {
  return (
    <>
      <main>
        <Deck name="Untitled" numberOfCards="0" colour="bg-red-300" />
      </main>
    </>
  );
}

export default Main;
