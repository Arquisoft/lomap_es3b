import React from 'react';

type Imagen = {
    título: String;
    imagen: String;
    fecha: Date;
}

type ImageProps = {
    imagen: Imagen;
}

function Image(props:ImageProps): JSX.Element{
    return (
        <>
            <div className="imagen">
                <img src="" alt="" />
                <p className="titulo"></p>
            </div>
        </>
    );
}

export default Image;