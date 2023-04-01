import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSession } from '@inrupt/solid-ui-react';
import { useEffect, useState } from "react";
import Modal from './loginForm/Modal';
import { LoginButton, SessionProvider, LogoutButton } from "@inrupt/solid-ui-react";

type inicioProps = {

};

function InicioSesion(props: inicioProps): JSX.Element {

    const { session } = useSession();

    const [idp, setIdp] = useState("https://inrupt.net");
    const [showModal, setShowModal] = useState(false);

    function handleOpenModal() {
        console.log("abrirModal");
        setShowModal(true);
    }

    function handleCloseModal() {
        setShowModal(false);
    }

    if (!session.info.isLoggedIn) {
        return (
            <>
                <Button onClick={handleOpenModal}>Log In</Button>
                {showModal && (
                    <Modal handleClose={handleCloseModal}>
                        <Form.Label htmlFor="usuario">Usuario</Form.Label>
                        <Form.Control type="text" id="usuario" onChange={(e)=>setIdp(e.target.value)}></Form.Control>
                        <LoginButton
                            oidcIssuer={idp}
                            redirectUrl={window.location.href}
                            onError={console.log}
                        >
                            <Button > Aceptar </Button>
                        </LoginButton>
                    </Modal>
                )}
            </>
        );
    } else {
        return (
            <>
                <p>{session.info.sessionId}</p>
                <LogoutButton onError={console.log} >
                    <Button>Logout</Button>
                </LogoutButton>
            </>
        );
    }
}

export default InicioSesion;