import ReactDOM from "react-dom";

function Modal(props) {
  if (!props.isVisible) {
    return null;
  }
  return ReactDOM.createPortal(
    <>
      <div className="container absolute left-0 right-0 top-0 z-10 mx-auto bg-white">
        <div className="my-16 flex justify-between">
          <h1 className="text-4xl font-semibold">{props.heading}</h1>
          <button
            className="flex h-16 w-16 items-center justify-center rounded-full bg-black text-white"
            onClick={props.close}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="w-1/2">{props.children}</div>
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default Modal;
