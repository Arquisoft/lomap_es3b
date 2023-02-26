import React from 'react';

function Pruebas(): JSX.Element {

    return (
        <>
           <div className="Buscador">
                <p> 🔍︎ Buscador </p>
                <input type="text" name="buscar" value=" "> </input>
            </div>
            <div>
                <img src= "multimedia/mapa.png" alt="Mapa" ></img>
            </div>
        </>
    );
}

export default Pruebas;
