import React, { useState } from "react";

function Table({ cards, setCards, cardError, deck_id, setDeletedCardsIds }) {
  const [selectAll, setSelectAll] = useState(false);

  function addCard(event) {
    event.preventDefault();
    const newCard = {
      front: "",
      back: "",
      deck_id: deck_id,
      selected: false,
    };
    setCards([...cards, newCard]);
  }

  function deleteCards(event) {
    event.preventDefault();
    const updatedCards = cards.filter((card) => !card.selected);
    setCards(updatedCards);

    if (typeof setDeletedCardsIds === "function") {
      const deletedCardId = cards
        .filter((card) => card.selected && card.card_id !== undefined)
        .map((card) => card.card_id);
      setDeletedCardsIds((prevDeletedCardsIds) => [
        ...prevDeletedCardsIds,
        ...deletedCardId,
      ]);
    }

    if (updatedCards.length === 0) {
      setSelectAll(false);
    }
  }

  function handleTextarea(event, index) {
    const { name, value } = event.target;
    const updatedCards = [...cards];
    updatedCards[index] = { ...updatedCards[index], [name]: value };
    setCards(updatedCards);
  }

  function handleSelectAll() {
    setSelectAll(!selectAll);

    // No idea why when selectAll is 'false' it selects all when it should be the other way around.
    if (selectAll === false) {
      const updatedCards = cards.map((card) => {
        return { ...card, selected: true };
      });
      setCards(updatedCards);
    }

    if (selectAll === true) {
      const updatedCards = cards.map((card) => {
        return { ...card, selected: false };
      });
      setCards(updatedCards);
    }
  }

  function handleSelect(index) {
    const updatedCards = cards.map((card, i) => {
      if (i === index) {
        return { ...card, selected: !card.selected };
      } else {
        return card;
      }
    });
    setCards(updatedCards);
  }

  return (
    <>
      <div className="mb-2 flex w-full justify-between">
        <h2 className="text-left text-xl font-medium">Cards</h2>
        <div className="flex w-1/4 justify-end space-x-2">
          <button
            className="flex items-center rounded-md border-2 border-red-500 px-4 py-1 font-medium text-red-500"
            onClick={(event) => deleteCards(event)}
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
                d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z"
              />
            </svg>
            Delete
          </button>
          <button
            className="flex items-center rounded-md bg-black px-4 py-1 font-medium text-white"
            onClick={(event) => addCard(event)}
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
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Add
          </button>
        </div>
      </div>
      <table className="w-full table-fixed">
        <thead className="text-left">
          <tr>
            <th className="w-10 border border-b-2 bg-slate-50 p-3 font-medium">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th className="w-1/2 border border-b-2 bg-slate-50 p-3 font-medium">
              Front
            </th>
            <th className="w-1/2 border border-b-2 bg-slate-50 p-3 font-medium">
              Back
            </th>
          </tr>
        </thead>
        <tbody>
          {cards.map((card, index) => (
            <tr key={index}>
              <td className="border p-3">
                <input
                  type="checkbox"
                  checked={card.selected}
                  onChange={() => handleSelect(index)}
                />
              </td>
              <td className="relative h-40 border text-left align-top">
                <textarea
                  className="block h-full w-full resize-none p-3 outline-2 outline-black"
                  type="text"
                  name="front"
                  rows="4"
                  value={card.front}
                  onChange={(event) => handleTextarea(event, index)}
                />
              </td>
              <td className="relative h-40 border text-left align-top">
                <textarea
                  className="block h-full w-full resize-none p-3 outline-2 outline-black"
                  type="text"
                  name="back"
                  rows="4"
                  value={card.back}
                  onChange={(event) => handleTextarea(event, index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="table-footer-group">
          <tr>
            <td colSpan="3">
              {cardError && (
                <span className="text-sm italic text-red-500">
                  * Please fill in both the front and back of the card(s).
                </span>
              )}
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}

export default Table;
