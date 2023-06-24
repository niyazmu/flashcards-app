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
            <div key={deck.deck_id}>
              <Deck
                name={deck.name}
                numberOfCards={countCards(deck.deck_id)}
                colour={deck.colour}
                deck_id={deck.deck_id}
              />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default Main;
