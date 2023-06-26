function Swatch({ colour, checked, handleChange }) {
  return (
    <label
      htmlFor={colour}
      className={`flex h-[3.15rem] w-[3.15rem] bg-${colour}-400 relative cursor-pointer rounded-sm`}
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
      {checked && (
        <span className="absolute inset-2 flex items-center justify-center">
          <span className="h-4 w-4 rounded-full border-2 border-white bg-transparent"></span>
        </span>
      )}
    </label>
  );
}

export default Swatch;
