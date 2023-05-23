/* You can only pass Tailwind CSS background colours (e.g. 'bg-red-300') to 'colour'. */

function Swatch({ colour, checked, handleChange }) {
  const borderColour = `border${colour.substring(2).replace("300", "100")}`;
  return (
    <label
      htmlFor={colour}
      className={`${
        checked ? "border-4 " + borderColour : "border-0"
      } flex h-10 w-10 ${colour}`}
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
