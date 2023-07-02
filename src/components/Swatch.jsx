function Swatch({ colour, checked, handleChange }) {
  return (
    <label
      htmlFor={colour}
      className={`flex h-[3.15rem] w-[3.15rem] bg-${colour}-400 relative cursor-pointer rounded-full`}
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="white"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      )}
    </label>
  );
}

export default Swatch;
