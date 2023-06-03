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
        <div className="container mx-auto">
          <div className="grid grid-cols-3 gap-4">
            {decks.map((deck) => (
              <Deck
                key={deck.deck_id}
                name={deck.name}
                numberOfCards={countCards(deck.deck_id)}
                colour={deck.colour}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default Main;
