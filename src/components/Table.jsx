import React, { useState } from "react";

function Table() {
  const [cards, setCards] = useState([
    { card_id: 1, front: "", back: "", deck_id: 1, selected: false },
    { card_id: 2, front: "", back: "", deck_id: 1, selected: false },
    { card_id: 3, front: "", back: "", deck_id: 1, selected: false },
  ]);
  const [selectAll, setSelectAll] = useState(false);

  function addCard() {
    const newCard = {
      card_id: 2,
      front: "",
      back: "",
      deck_id: 1,
      selected: false,
    };
    setCards([...cards, newCard]);
  }

  function deleteCards() {
    const updatedCards = cards.filter((card) => !card.selected);
    setCards(updatedCards);
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

  function handleSelect(id) {
    const updatedCards = cards.map((card) => {
      if (card.card_id === id) {
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
            onClick={deleteCards}
          >
            Delete
          </button>
          <button
            className="rounded bg-blue-500 px-4 py-1 text-white"
            onClick={addCard}
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
                  onChange={() => handleSelect(card.card_id)}
                />
              </td>
              <td className="relative border text-left align-top">
                <textarea
                  className="block h-full w-full resize-none p-3 focus:text-blue-500 focus:outline-double focus:outline-blue-500"
                  type="text"
                  name="front"
                  rows="4"
                  value={card.front}
                  onChange={(event) => handleTextarea(event, index)}
                />
              </td>
              <td className="relative border text-left align-top">
                <textarea
                  className="block h-full w-full resize-none p-3 focus:text-blue-500 focus:outline-double focus:outline-blue-500"
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
      </table>
    </>
  );
}

export default Table;
