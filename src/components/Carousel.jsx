import { useState } from "react";

function Carousel({ cards }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <>
      <div className="">{flipped ? cards[0].front : cards[0].back}</div>
      <button className="">Mark incorrect</button>
      <button className="" onClick={() => setFlipped(!flipped)}>
        Flip card
      </button>
      <button className="">Mark correct</button>
    </>
  );
}

export default Carousel;
