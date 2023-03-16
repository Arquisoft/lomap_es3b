import React from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSession } from '@inrupt/solid-ui-react';
import {LogoutButton } from "@inrupt/solid-ui-react";

type inicioProps = {

};

function InicioSesion(props: inicioProps): JSX.Element{

    const { session } = useSession();

    return (
        <>
            <div className="inicioSesion">
                <LogoutButton onError={console.log}></LogoutButton>
            </div>
        </>
    );
}

export default InicioSesion;