import supabase from "../supabaseClient";

import { useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";

import NotSupportedPage from "./NotSupportedPage.jsx";

function DeckPage({ windowWidth }) {
  const { deck_id } = useParams();
  const navigate = useNavigate();

  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([{}]);
  const [flipped, setFlipped] = useState(false);
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [hideResult, setHideResult] = useState(true);

  const numOfCards = cards.length;

  useEffect(() => {
    fetchDeck();
    fetchCards();
  }, []);

  async function fetchDeck() {
    try {
      const { data, error } = await supabase
        .from("decks")
        .select("*")
        .eq("deck_id", deck_id)
        .limit(1);
      if (error) throw error;
      if (data != null) {
        setDeck(data[0]);
      }
    } catch (error) {
      navigate("/not-found");
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

  function flip() {
    setFlipped(!flipped);
  }

  function correct() {
    setFlipped(false);
    setCount((prevCount) => prevCount + 1);
    setIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      if (newIndex < numOfCards) {
        return newIndex;
      } else {
        setHideResult(false);
        return prevIndex;
      }
    });
  }

  function incorrect() {
    setFlipped(false);
    setIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      if (newIndex < numOfCards) {
        return newIndex;
      } else {
        setHideResult(false);
        return prevIndex;
      }
    });
  }

  function refresh() {
    window.location.reload();
  }

  return (
    <>
      {windowWidth >= 1024 ? (
        <>
          <div className={`flex h-screen flex-col bg-${deck.colour}-500 px-8`}>
            <header>
              <div className="container mx-auto">
                <div className="my-16 flex items-center">
                  {hideResult && (
                    <div className="mr-4 flex flex-col items-start">
                      <span className="hidden italic">
                        {index} / {numOfCards}
                      </span>
                      <div className="text-xl font-semibold">{deck.name}</div>
                    </div>
                  )}
                  <button
                    className={`ml-auto flex rounded-full bg-${deck.colour}-600 px-8 py-5 font-semibold text-black`}
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
            </header>
            <main className="flex flex-grow">
              {hideResult ? (
                <>
                  <div className="container mx-auto flex flex-col items-center justify-center">
                    <div className="xl:h-[26rem] xl:w-[54rem] flex items-center justify-center rounded-3xl bg-white p-8 lg:h-[24rem] lg:w-[50rem] 2xl:h-[28rem] 2xl:w-[60rem]">
                      {flipped ? (
                        <div className="text-4xl">{cards[index].back}</div>
                      ) : (
                        <div className="text-4xl">{cards[index].front}</div>
                      )}
                    </div>
                    <div className="mb-16 mt-8 flex gap-4">
                      <button
                        className="flex rounded-full bg-black px-8 py-4 text-white"
                        onClick={incorrect}
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
                        className="flex rounded-full bg-black px-8 py-4 text-white"
                        onClick={flip}
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
                        className="flex rounded-full bg-black px-8 py-4 text-white"
                        onClick={correct}
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
                  </div>
                </>
              ) : (
                <>
                  <div className="container mx-auto flex flex-col items-center justify-center">
                    <div className="mb-48 mt-16 flex flex-col items-center">
                      <h1 className="mb-8 text-left">
                        <span className="text-2xl font-medium lg:text-4xl">
                          You scored
                        </span>
                        <br />
                        <span className="text-5xl font-medium lg:text-8xl">
                          {count} out of {numOfCards}
                        </span>
                      </h1>
                      <button
                        className="flex rounded-full bg-black px-8 py-4 text-white"
                        onClick={() => refresh()}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="h-6 w-6 lg:mr-2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                          />
                        </svg>
                        <span>Retry</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </main>
          </div>
        </>
      ) : (
        <NotSupportedPage />
      )}
    </>
  );
}

export default DeckPage;
