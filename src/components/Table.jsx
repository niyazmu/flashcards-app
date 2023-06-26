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
            className="rounded bg-red-500 px-4 py-1 text-white"
            onClick={(event) => deleteCards(event)}
          >
            Delete
          </button>
          <button
            className="rounded bg-blue-500 px-4 py-1 text-white"
            onClick={(event) => addCard(event)}
          >
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
              <td className="relative border text-left align-top">
                <textarea
                  className="block h-full w-full resize-none p-3 outline-2 outline-blue-500"
                  type="text"
                  name="front"
                  rows="4"
                  value={card.front}
                  onChange={(event) => handleTextarea(event, index)}
                />
              </td>
              <td className="relative border text-left align-top">
                <textarea
                  className="block h-full w-full resize-none p-3 outline-2 outline-blue-500"
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
