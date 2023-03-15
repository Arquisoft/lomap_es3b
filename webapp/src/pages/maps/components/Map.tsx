// import React from 'react';
import L from "leaflet";

import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import {Marker, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getPlaces } from '../../../api/api';
import React,{useState,useEffect} from 'react';
import { Place } from '../../../shared/shareddtypes';

const icon = new L.Icon({
    iconUrl: require('../../../assets/marker-icon.png'),
    iconSize: new L.Point(50, 50),
    iconAnchor: [25,50],
    className: 'leaflet-div-icon'
});

type MapProps = {

};


function Map(props: MapProps): JSX.Element {

    var defaultPlace:Place = {
        direction: "Calle",
        latitude:0,
        longitude:0,
        comments: "",
        photoLink:[]
    }

    const [markers, setMarkers] = useState<Place>(defaultPlace);

    const handleClick = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        getMarkups();
    }

    var getMarkups = async () => {
        setMarkers(await getPlaces());
    }

    console.log(markers);

    const position:[number, number] = [43.35485, -5.85123]
    return (

        <>
            <form name="lugares" onSubmit={handleClick}>
                <button type="submit"> Cargar</button>
            </form>
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
                    <Marker position={[markers.latitude, markers.longitude]} icon={icon}>
                        <Popup>
                            {markers.direction}
                        </Popup>
                    </Marker>
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
