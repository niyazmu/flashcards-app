import { Link } from "react-router-dom";

import Deck from "./Deck.jsx";

function Main({ decks, cards }) {
  function countCards(deck_id) {
    const filteredCards = cards.filter((card) => card.deck_id === deck_id);
    const numberOfCards = filteredCards.length;
    return numberOfCards;
  }

  return (
    <>
      <main>
        <div className="grid grid-cols-4 gap-8">
          {decks.map((deck) => (
            <Link to={`/${deck.deck_id}`}>
              <Deck
                key={deck.deck_id}
                name={deck.name}
                numberOfCards={countCards(deck.deck_id)}
                colour={deck.colour}
              />
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export default Main;
