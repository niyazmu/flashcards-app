import { useState } from "react";

function Carousel({ name, cards }) {
  const [flipped, setFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const numOfCards = cards.length;

  function markCorrect() {
    setFlipped(false);
    setCorrectCount((prevCorrectCount) => prevCorrectCount + 1);
    const newIndex = currentIndex + 1;
    if (newIndex === numOfCards) {
      return;
    }
    setCurrentIndex(newIndex);
  }

  function markIncorrect() {
    setFlipped(false);
    const newIndex = currentIndex + 1;
    if (newIndex === numOfCards) {
      return;
    }
    setCurrentIndex(newIndex);
  }

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="my-8 flex w-1/2 justify-between text-fuchsia-600">
          <span>{name}</span>
          <span>
            {currentIndex + 1}/{numOfCards}
          </span>
        </div>
        <div className="flex h-1/2 w-1/2 flex-col justify-center rounded-2xl bg-white p-16">
          {flipped ? (
            <>
              <div className="text-center text-2xl">
                {cards[currentIndex].back}
              </div>
            </>
          ) : (
            <div className="text-center text-4xl">
              {cards[currentIndex].front}
            </div>
          )}
        </div>
        <div className="my-8 flex">
          <button
            className="mx-2 rounded-full bg-fuchsia-500 px-8 py-4 text-white"
            onClick={markIncorrect}
          >
            Mark incorrect
          </button>
          <button
            className="mx-2 rounded-full bg-fuchsia-500 px-8 py-4 text-white"
            onClick={() => setFlipped(!flipped)}
          >
            Flip card
          </button>
          <button
            className="mx-2 rounded-full bg-fuchsia-500 px-8 py-4 text-white"
            onClick={markCorrect}
          >
            Mark correct
          </button>
        </div>
      </div>
    </>
  );
}

export default Carousel;
