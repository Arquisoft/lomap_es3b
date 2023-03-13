import React from 'react';
import logo from '../multimedia/icono2.jpg'

type ImageProp = {

};

function Image(props: ImageProp): JSX.Element{
    return (
        <>
            <div className="imagen">
            <img src={logo} alt="Icono" ></img>
            </div>
        </>
    );
}

export default Image;