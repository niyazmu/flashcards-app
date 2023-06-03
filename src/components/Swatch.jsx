function Swatch({ colour, borderColour, checked, handleChange }) {
  return (
    <label
      htmlFor={colour}
      className={`${
        checked ? "border-4 " + borderColour : "border-0"
      } flex h-[3.15rem] w-[3.15rem] ${colour}`}
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
