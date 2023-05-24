function Deck({ name, numberOfCards, colour }) {
  return (
    <div className={`${colour}`}>
      <h1>{name}</h1>
      <span>{numberOfCards} cards</span>
    </div>
  );
}

export default Deck;
