import React, { ReactNode } from "react";
import "./Modal.css";

interface Props {
  handleClose: () => void;
  children: ReactNode;
}

// para que salga la pantalla con fondo difuminado para hacer login
function Modal(props: Props): JSX.Element{
  return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={props.handleClose}>
                    &times;
                </span>
                {props.children}
            </div>
        </div>
  );
}

export default Modal;
