import supabase from "../supabaseClient";

import { useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";

function DeckPage() {
  const { deck_id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState();
  const [colour, setColour] = useState();
  const [cards, setCards] = useState([{}]);

  useEffect(() => {
    fetchName();
    fetchColour();
    fetchCards();
  }, []);

  async function fetchName() {
    try {
      const { data, error } = await supabase
        .from("decks")
        .select("name")
        .eq("deck_id", deck_id)
        .limit(1);
      if (error) throw error;
      if (data != null) {
        setName(data[0].name);
      }
    } catch (error) {
      navigate("/not-found");
    }
  }

  async function fetchColour() {
    try {
      const { data, error } = await supabase
        .from("decks")
        .select("colour")
        .eq("deck_id", deck_id)
        .limit(1);
      if (error) throw error;
      if (data != null) {
        setColour(data[0].colour.replace("bg-", "").replace(/-\d{2,3}$/, "")); // explain this later
      }
    } catch (error) {
      alert(error.message);
    }
  }

  async function fetchCards() {
    try {
      const { data, error } = await supabase
        .from("cards")
        .select("*")
        .eq("deck_id", deck_id);
      if (error) throw error;
      if (data != null) {
        setCards(data);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  const [flipped, setFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [hideResult, setHideResult] = useState(true);
  console.log(hideResult);

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
      <div className={`flex h-screen flex-col bg-${colour}-500`}>
        <div className="container mx-auto">
          <div className={`mt-16 flex items-center text-black`}>
            {hideResult && (
              <div className="flex flex-col items-start">
                <span className="italic">
                  {currentIndex + 1} / {numOfCards}
                </span>
                <div className="text-4xl font-semibold">{name}</div>
              </div>
            )}
            <button
              className={`ml-auto flex items-center rounded-full bg-${colour}-600 px-8 py-5 font-semibold text-black`}
              onClick={() => navigate("/")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="mr-2 h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
              Go back
            </button>
          </div>
        </div>

        <div className="flex h-screen flex-col items-center justify-center">
          {hideResult ? (
            <>
              <div
                className={`flex h-1/2 w-1/2 flex-col justify-center rounded-3xl bg-white p-16`}
              >
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
              <div className="mt-8 flex gap-4">
                <button
                  className={`flex items-center rounded-full bg-black px-8 py-4 text-white`}
                  onClick={markIncorrect}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="mr-2 h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                    />
                  </svg>
                  Mark incorrect
                </button>
                <button
                  className={`flex items-center rounded-full bg-black px-8 py-4 text-white`}
                  onClick={() => setFlipped(!flipped)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="mr-2 h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                    />
                  </svg>
                  Flip card
                </button>
                <button
                  className={`flex items-center rounded-full bg-black px-8 py-4 text-white`}
                  onClick={markCorrect}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="mr-2 h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3"
                    />
                  </svg>
                  Mark correct
                </button>
              </div>
            </>
          ) : (
            <>
              <div className={`mb-16 text-4xl font-semibold`}>
                You scored <br />
                <span className="text-8xl ">
                  {correctCount} out of {numOfCards}
                </span>
              </div>
              <button
                className={`mx-2 flex items-center rounded-full bg-black px-8 py-4 text-white`}
                onClick={() => refresh()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="mr-2 h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
                Retry
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default DeckPage;
