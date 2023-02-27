import React from 'react';
import mapa from '../multimedia/mapa.png';

type MapProps={

};

function Map(props: MapProps): JSX.Element {

    return (
        <>
            <div className="buscador">
                <input type="text" name="buscar"></input>
                <button> 🔍︎ Buscar  </button>
            </div>
            <div>
                <img src= {mapa} alt="Mapa" ></img>
            </div>
        </>
    );
}

export default Map;
