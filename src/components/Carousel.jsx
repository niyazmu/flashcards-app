import { useState } from "react";

function Carousel({ cards }) {
  const [flipped, setFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  function markCorrect() {
    setFlipped(false);
    const lastIndex = cards.length;
    const newIndex = currentIndex + 1;
    if (newIndex === lastIndex) {
      return; // stop incrementing
    }
    setCurrentIndex(newIndex);
  }

  function markIncorrect() {
    setFlipped(false);
    const lastIndex = cards.length;
    const newIndex = currentIndex + 1;
    if (newIndex === lastIndex) {
      return; // stop incrementing
    }
    setCurrentIndex(newIndex);
  }

  return (
    <>
      <div className="">
        {flipped ? cards[currentIndex].front : cards[currentIndex].back}
      </div>
      <button className="" onClick={markIncorrect}>
        Mark incorrect
      </button>
      <button className="" onClick={() => setFlipped(!flipped)}>
        Flip card
      </button>
      <button className="" onClick={markCorrect}>
        Mark correct
      </button>
    </>
  );
}

export default Carousel;
