import ReactDOM from "react-dom";

function Modal(props) {
  if (!props.isVisible) {
    return null;
  }
  return ReactDOM.createPortal(
    <>
      <div className="fixed bottom-0 left-0 right-0 top-0 z-10 bg-black bg-opacity-50"></div>
      <div className="relative left-1/4 z-10 w-1/2 bg-white p-8">
        <div className="flex justify-between">
          <h1 className="text-2xl">{props.heading}</h1>
          <button onClick={props.close}>&#215;</button>
        </div>
        <hr className="my-4"></hr>
        {props.children}
      </div>
      <div className="mb-6"></div>
    </>,
    document.getElementById("portal")
  );
}

export default Modal;
