import React from 'react';
import Button from 'react-bootstrap/Button';

type inicioProp = {

};

function InicioSesion(props: inicioProp): JSX.Element{
    return (
        <>
            <div className="inicioSesion">
            <Button variant="outline-warning">Inicio de sesión</Button>{' '}
            </div>
        </>
    );
}

export default InicioSesion;