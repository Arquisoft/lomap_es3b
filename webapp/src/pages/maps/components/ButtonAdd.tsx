import React from 'react';


type ButtonAddProps = {
    onClick:()=>void;
}

function ButtonAdd(props: ButtonAddProps): JSX.Element {

    return (
        <>
            <button onClick={()=>props.onClick()}>
                Prueba
            </button>
        </>
    );
}

export default ButtonAdd;