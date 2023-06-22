function Swatch({ colour, checked, handleChange }) {
  return (
    <label
      htmlFor={colour}
      className={`${
        checked ? `border-2 border-${colour}-600` : ""
      } flex h-[3.15rem] w-[3.15rem] bg-${colour}-400 rounded-sm`}
    >
      <input
        className="hidden"
        type="radio"
        id={colour}
        name="colour"
        value={colour}
        checked={checked}
        onChange={handleChange}
      />
    </label>
  );
}

export default Swatch;
