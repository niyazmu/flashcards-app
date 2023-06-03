function Deck({ name, numberOfCards, colour }) {
  return (
    <div className={`${colour} rounded-xl p-8`}>
      <h1 className="mb-16 text-xl font-semibold">{name}</h1>
      <span className="opacity-90">{numberOfCards} cards</span>
    </div>
  );
}

export default Deck;
