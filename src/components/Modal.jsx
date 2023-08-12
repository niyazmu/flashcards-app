import ReactDOM from "react-dom";

function Modal(props) {
  if (!props.isVisible) {
    return null;
  }
  return ReactDOM.createPortal(
    <>
      <div className="absolute right-0 top-0 z-10 h-screen w-screen overflow-y-auto bg-white">
        <div className="container mx-auto px-8 2xl:px-16">
          <div className="my-16 flex items-center justify-between">
            <h1 className="flex-grow-0 text-3xl font-semibold 2xl:text-4xl">
              {props.heading}
            </h1>
            <button
              className="ml-8 flex h-16 w-16 items-center justify-center rounded-full bg-black text-white"
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
          <div className="mb-16 w-full 2xl:w-3/5">{props.children}</div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default Modal;
