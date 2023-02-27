import React from 'react';

type PruebaProps={

};

function Prueba(props: PruebaProps): JSX.Element {

    return (
        <>
            <div className="buscador">
                <input type="text" name="buscar" value=" "> </input>
                <button> 🔍︎ Buscar  </button>
            </div>
            <div>
                <img src= "multimedia/mapa.png" alt="Mapa" ></img>
            </div>
        </>
    );
}

export default Prueba;
