import React from 'react';
import { Imagen } from '../../../shared/shareddtypes';


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