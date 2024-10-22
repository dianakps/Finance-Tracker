function Modal({ show, onClose, children }) {
  return (
    <>
      <div
        style={{ transform: show ? "translateX(0%)" : "translateX(-200%)" }}
        className="absolute top-0 left-0 w-full h-full py-6 px-6 z-10 transition-all  duration-1000"
      >
        <div className="container rounded-2xl bg-slate-500 w-[80vw] h-[80vh] py-6 px-6 mx-auto">
          <button
            className="w-10 h-10 rounded-full my-5 bg-slate-800"
            onClick={() => onClose(false)}
          >
            X
          </button>
          {children}
        </div>
      </div>
    </>
  );
}

export default Modal;
