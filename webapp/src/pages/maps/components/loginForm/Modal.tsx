import React, { ReactNode } from "react";
import Button from 'react-bootstrap/Button';
import "./Modal.css";

interface Props {
  handleClose: () => void;
  children: ReactNode;
}

// para que salga la pantalla con fondo difuminado para hacer login
function Modal(props: Props): JSX.Element {
  return (
    <div className="modal">
      <Button className="close" onClick={props.handleClose}>
        &times;
      </Button>
      <div className="modal-content">
        {props.children}
      </div>
    </div>
  );
}

export default Modal;
