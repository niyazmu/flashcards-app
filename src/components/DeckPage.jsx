import supabase from "../supabaseClient";

import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import Carousel from "./Carousel";

function DeckPage() {
  const { deck_id } = useParams();

  const [cards, setCards] = useState([{}]);

  useEffect(() => {
    fetchCards();
  }, []);

  async function fetchCards() {
    try {
      const { data, error } = await supabase
        .from("cards")
        .select("*")
        .eq("deck_id", deck_id);
      if (error) throw error;
      if (data != null) {
        setCards(data);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <>
      <div className="h-screen w-screen bg-fuchsia-400">
        <Carousel cards={cards} />
      </div>
    </>
  );
}

export default DeckPage;
