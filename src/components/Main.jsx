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
        {decks.map((deck) => (
          <Deck
            key={deck.deck_id}
            name={deck.name}
            numberOfCards={countCards(deck.deck_id)}
            colour={deck.colour}
          />
        ))}
      </main>
    </>
  );
}

export default Main;
