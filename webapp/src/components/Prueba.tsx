import React from 'react';

function Pruebas(): JSX.Element {

    return (
        <>

            <div className="Buscador">
                <input type="text" name="buscar" value=" "> </input>
                <button> 🔍︎ Buscar </button>
            </div>
            <div>
                <img src= "multimedia/mapa.png" alt="Mapa" ></img>
            </div>
        </>
    );
}

export default Pruebas;
