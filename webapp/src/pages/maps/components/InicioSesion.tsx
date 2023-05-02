import React from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSession } from '@inrupt/solid-ui-react';
import { useState } from "react";
import Modal from './loginForm/Modal';
import { LoginButton, LogoutButton } from "@inrupt/solid-ui-react";

type inicioProps = {

};

function InicioSesion(props: inicioProps): JSX.Element {

    const { session } = useSession();
    const [showModal, setShowModal] = useState(false);

    function handleOpenModal() {
        setShowModal(true);
    }

    function handleCloseModal() {
        setShowModal(false);
    }

    if (!session.info.isLoggedIn) {
        return (
            <>
                <Button onClick={handleOpenModal}>Log In</Button>
                {showModal ?
                    <Modal handleClose={handleCloseModal}>
                        <LoginButton
                            oidcIssuer={"https://inrupt.net"}
                            redirectUrl={window.location.href}
                            onError={console.log}
                        >
                            <Button name="inrupt"> Login with Inrupt </Button>
                        </LoginButton>
                        <LoginButton
                            oidcIssuer={"https://solidcommunity.net/"}
                            redirectUrl={window.location.href}
                            onError={console.log}
                        >
                            <Button name="solidcommunity"> Login with SolidCommunity </Button>
                        </LoginButton>
                    </Modal> : <></>
                }
            </>
        );
    } else {
        return (
            <>
                <div>
                    <LogoutButton onError={console.log} >
                        <Button onClick={() => { }}>Log Out</Button>
                    </LogoutButton>
                </div>

            </>
        );
    }
}

export default InicioSesion;