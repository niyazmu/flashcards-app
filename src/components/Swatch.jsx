function Swatch({ colour, checked, handleChange }) {
  return (
    <label
      htmlFor={colour}
      className={`${
        checked ? `border-4 border-${colour}-300` : "border-0"
      } flex h-[3.15rem] w-[3.15rem] bg-${colour}-400`}
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
