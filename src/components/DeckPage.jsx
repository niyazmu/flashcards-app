import supabase from "../supabaseClient";

import { useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";

import Carousel from "./Carousel";

function DeckPage() {
  const { deck_id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState();
  const [cards, setCards] = useState([{}]);

  useEffect(() => {
    fetchName();
    fetchCards();
  }, []);

  async function fetchName() {
    try {
      const { data, error } = await supabase
        .from("decks")
        .select("name")
        .eq("deck_id", deck_id)
        .limit(1);
      if (error) throw error;
      if (data != null) {
        setName(data[0].name);
      }
    } catch (error) {
      navigate("/not-found");
    }
  }

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
      navigate("/not-found");
    }
  }

  return (
    <>
      <div className="h-screen w-screen bg-fuchsia-400">
        <Carousel name={name} cards={cards} />
      </div>
    </>
  );
}

export default DeckPage;
