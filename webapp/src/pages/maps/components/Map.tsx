// import React from 'react';
// import L from "leaflet";

import React from "react";
import L from "leaflet";
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import {Marker, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


type MapProps = {

};


function Map(props: MapProps): JSX.Element {
    const position:[number, number] = [51.505, -0.09]
    return (

        <>
            <div className="buscador">
                <input type="text" name="buscar"></input>
                <button> 🔍︎ Buscar  </button>

            </div>
            <div className="map">
                
                <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </MapContainer>
            </div>


        </>

    );
}


// function Mostrarmapa():JSX.Element {

//     const position = [8.1386, 5.1026]; // [latitude, longitude]
//     const zoomLevel = 13;
//     return (


//       <TileLayer
//         url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
//       />

//         );
// }

export default Map;
