import React, { useState } from "react";
import Modal from "./Modal";
//import LoginForm from "./LoginForm";


// ESTO HAY QUE AÑADIRLO AL BOTON QUE ABRA EL MODAL --> BOTON DE INICIO DE SESION
// crea un estado para controlar si el modal esta abierto o no
// el modal es la ventana emergente que saldra cuando quieras hacer login
function App() {
  const [showModal, setShowModal] = useState(false);

  function handleOpenModal() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  return (
    <div className="App">
      <h1>Welcome to My App</h1>
      <button onClick={handleOpenModal}>Log In</button>
      {showModal && (
        <Modal handleClose={handleCloseModal}>
          <LoginForm handleClose={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
}

export default App;
