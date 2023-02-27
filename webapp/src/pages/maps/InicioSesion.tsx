import React from 'react';
import Button from 'react-bootstrap/Button';

type inicioProps = {

};

function InicioSesion(props: inicioProps): JSX.Element{
    return (
        <>
            <div className="inicioSesion">
            <Button variant="outline-warning">Inicio de sesión</Button>{' '}
            </div>
        </>
    );
}

export default InicioSesion;