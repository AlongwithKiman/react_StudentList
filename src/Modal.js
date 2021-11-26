import React from "react";
import "./Modal.css";

const Modal = props => {
  const { open, close, header, onCreate } = props;
  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <main>{props.children}</main>
          <footer>
            <button
              className="add"
              onClick={onCreate}
              style={{ backgroundColor: "green" }}
            >
              {" "}
              추가{" "}
            </button>
            <button
              className="close"
              onClick={close}
              style={{ backgroundColor: "pink" }}
            >
              {" "}
              닫기{" "}
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default Modal;
