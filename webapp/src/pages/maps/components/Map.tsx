import L from "leaflet";

import { MapContainer, TileLayer, useMap, useMapEvents  } from 'react-leaflet';
import {Marker, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getPlaces } from '../../../api/api';
import React,{useState,useEffect} from 'react';
import { Place } from '../../../shared/shareddtypes';
import { guardarLugar } from '../../../../../restapi/database/config';



const icon = new L.Icon({
    iconUrl: require('../../../assets/marker-icon.png'),
    iconSize: new L.Point(50, 50),
    iconAnchor: [25,50],
    className: 'leaflet-div-icon'
});

type MapProps = {
    
};


let listPlaces:Place[] = [{
    name: "Escuela de Ingeniería Informática",
    direction: "Calle Valdés Salas 11",
    latitude:43.35485,
    longitude:-5.85123,
    comments: "",
    photoLink:[]
}, {
     name: "Gijón",
     direction: "Gijón",
     latitude:43.5322,
     longitude:-5.6611,
     comments: "",
     photoLink:[]
}]




function Map(props: MapProps): JSX.Element {

    const defaultPlace:Place = {
        name: "Ronda 14",
        direction: "Aviles",
        latitude:43.5580,
        longitude:-5.9247,
        comments: "",
        photoLink:[]
    }

    const [markers, setMarkers] = useState<Place>(defaultPlace);


    const handleClick = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //guardarLugar(defaultPlace);
        getMarkups();
    }

    let getMarkups = async () => {
        setMarkers(await getPlaces());   // PARA OBTENER LOS LUGARES DE MONGODB
    }
   

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
                <MapContainer center={[43.35485, -5.85123]} zoom={13} scrollWheelZoom={false} > 
                    <TileLayer 
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MapContent />
                    {listPlaces.map((position2, idx) =>
                        <Marker key={idx} position={[position2.latitude, position2.longitude]} icon={icon}>
                            <Popup>
                            {position2.direction}
                        </Popup>
                        
                        </Marker>
                    )} 
                </MapContainer>
            </div>
        </>
    );
}


const MapContent = () => {
    const map = useMapEvents({
        click(e) {              
            var marker = new L.Marker([e.latlng.lat,e.latlng.lng]);  
            marker.setIcon(icon);
            map.addLayer(marker);
        },            
    })

    return (

        <>   
           
        </>
    );
}



export default Map;