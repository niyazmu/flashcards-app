import ReactDOM from "react-dom";

function Modal(props) {
  if (!props.isVisible) {
    return null;
  }
  return ReactDOM.createPortal(
    <>
      <div className="fixed bottom-0 left-0 right-0 top-0 z-10 bg-black bg-opacity-50"></div>
      <div className="fixed left-1/2 top-1/2 z-10 w-2/4 -translate-x-1/2 -translate-y-1/2 transform bg-white p-8">
        <div className="flex justify-between">
          <h1 className="text-2xl">{props.heading}</h1>
          <button className="" onClick={props.close}>
            &#215;
          </button>
        </div>
        <hr className="my-4"></hr>
        {props.children}
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default Modal;
