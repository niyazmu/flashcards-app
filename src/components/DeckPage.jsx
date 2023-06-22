import supabase from "../supabaseClient";

import { useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";

import Carousel from "./Carousel";

function DeckPage() {
  const { deck_id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState();
  const [colour, setColour] = useState();
  const [cards, setCards] = useState([{}]);

  useEffect(() => {
    fetchName();
    fetchColour();
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

  async function fetchColour() {
    try {
      const { data, error } = await supabase
        .from("decks")
        .select("colour")
        .eq("deck_id", deck_id)
        .limit(1);
      if (error) throw error;
      if (data != null) {
        setColour(data[0].colour.replace("bg-", "").replace(/-\d{2,3}$/, "")); // explain this later
      }
    } catch (error) {
      alert(error.message);
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
      alert(error.message);
    }
  }

  return (
    <>
      <div className={`h-screen w-screen bg-${colour}-400`}>
        <Carousel name={name} colour={colour} cards={cards} />
      </div>
    </>
  );
}

export default DeckPage;
