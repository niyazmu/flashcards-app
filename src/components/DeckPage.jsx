import { useParams } from "react-router-dom";

import Carousel from "./Carousel";

function DeckPage({ cards }) {
  const { deck_id } = useParams();
  const deckCards = cards.filter((card) => card.deck_id === parseInt(deck_id));

  return <Carousel cards={deckCards} />;
}

export default DeckPage;
