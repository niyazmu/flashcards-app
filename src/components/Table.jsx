import React, { useState } from "react";

function Table() {
  const [cards, setCards] = useState([
    { card_id: 1, front: "", back: "", deck_id: 1, selected: false },
  ]);
  console.log(cards);

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

  return (
    <>
      <div className="mb-2 flex w-full justify-between">
        <h2 className="text-left text-2xl font-medium">Cards</h2>
        <div className="flex w-1/4 justify-end space-x-2">
          <button className="rounded bg-red-500 px-4 py-1 text-white">
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
              <input type="checkbox" />
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
          <tr>
            <td className="border p-3">
              <input type="checkbox" />
            </td>
            <td className="relative border text-left align-top">
              <textarea
                className="block h-full w-full resize-none p-3 focus:text-blue-500 focus:outline-double focus:outline-blue-500"
                type="text"
                name="front"
                rows="4"
              />
            </td>
            <td className="relative border text-left align-top">
              <textarea
                className="block h-full w-full resize-none p-3 focus:text-blue-500 focus:outline-double focus:outline-blue-500"
                type="text"
                name="back"
                rows="4"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default Table;
