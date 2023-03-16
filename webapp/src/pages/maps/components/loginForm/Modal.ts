import React from 'react';
import "./Modal.css";

interface Props {
  handleClose: () => void;
  children: ReactNode;
}

function Modal(props: Props):  JSX.Element{
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
