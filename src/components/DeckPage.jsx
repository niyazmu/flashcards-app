import { useParams } from "react-router-dom";

function DeckPage({ cards }) {
  const { deck_id } = useParams();

  const deckCards = cards.filter((card) => card.deck_id === parseInt(deck_id));

  console.log(deckCards);
  return <h1>This is the deck page.</h1>;
}

export default DeckPage;
