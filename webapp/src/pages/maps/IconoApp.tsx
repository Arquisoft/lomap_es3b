import React from 'react';

type ImageProp = {

};

function Image(props: ImageProp): JSX.Element{
    return (
        <>
            <div className="imagen">
            <img src="images/icono2.jpg" alt="Icono" />
            </div>
        </>
    );
}

export default Image;