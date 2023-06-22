import { useState } from "react";

function Carousel({ name, colour, cards }) {
  const [flipped, setFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [hideResult, setHideResult] = useState(true);

  const numOfCards = cards.length;
  const shuffledCards = cards.sort(() => Math.random() - 0.5);
  console.log(colour);

  function markCorrect() {
    setFlipped(false);
    setCorrectCount((prevCorrectCount) => prevCorrectCount + 1);
    const newIndex = currentIndex + 1;
    if (newIndex === numOfCards) {
      setHideResult(false);
    }
    setCurrentIndex(newIndex);
  }

  function markIncorrect() {
    setFlipped(false);
    const newIndex = currentIndex + 1;
    if (newIndex === numOfCards) {
      setHideResult(false);
    }
    setCurrentIndex(newIndex);
  }

  function refresh() {
    window.location.reload();
  }

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center">
        {hideResult ? (
          <>
            <div
              className={`my-8 flex w-1/2 justify-between text-${colour}-600 font-medium`}
            >
              <span>{name}</span>
              <span>
                {currentIndex + 1} / {numOfCards}
              </span>
            </div>
            <div className="flex h-1/2 w-1/2 flex-col justify-center rounded-2xl bg-white p-16">
              {flipped ? (
                <>
                  <div className="text-center text-2xl">
                    {shuffledCards[currentIndex].back}
                  </div>
                </>
              ) : (
                <div className="text-center text-4xl">
                  {shuffledCards[currentIndex].front}
                </div>
              )}
            </div>
            <div className="my-8 flex">
              <button
                className={`mx-2 rounded-full bg-${colour}-500 px-8 py-4 text-white`}
                onClick={markIncorrect}
              >
                Mark incorrect
              </button>
              <button
                className={`mx-2 rounded-full bg-${colour}-500 px-8 py-4 text-white`}
                onClick={() => setFlipped(!flipped)}
              >
                Flip card
              </button>
              <button
                className={`mx-2 rounded-full bg-${colour}-500 px-8 py-4 text-white`}
                onClick={markCorrect}
              >
                Mark correct
              </button>
            </div>
          </>
        ) : (
          <>
            <div className={`text-8xl font-bold uppercase text-${colour}-500`}>
              You scored {correctCount}/{numOfCards} <br />
              You scored {correctCount}/{numOfCards} <br />
              You scored {correctCount}/{numOfCards} <br />
              You scored {correctCount}/{numOfCards} <br />
              You scored {correctCount}/{numOfCards}
            </div>
            <button
              className={`mx-2 rounded-full bg-${colour}-500 my-8 px-8 py-4 text-white`}
              onClick={refresh}
            >
              Retry
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default Carousel;
