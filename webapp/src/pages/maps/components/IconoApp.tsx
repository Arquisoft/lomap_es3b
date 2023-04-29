import React from 'react';
import Logo from '../multimedia/icono2.jpg'

type ImageProp = {

};

function IconoApp(props: ImageProp): JSX.Element {
    return (
        <>
            <div className="imagen">
                <img src={Logo} alt="Icono" ></img>
            </div>
        </>
    );
}

export default IconoApp;