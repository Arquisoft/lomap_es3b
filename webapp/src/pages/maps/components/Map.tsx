// import React from 'react';
import L from "leaflet";
import { useSession } from "@inrupt/solid-ui-react";
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


// PREPARADO PARA CUANDO SE GUARDEN LOS MARCADORES
/** 
async function guardarMarcador(datos: any){
    await addMarcador(datos);
}
*/

type Props = {
    categorias: string[];
    amigos: string[];
    minDistance: number;
    maxDistance: number;
}

function Map({ categorias, amigos, minDistance, maxDistance }: Props): JSX.Element {

    const {session} = useSession();
    var defaultPlace:Place = {
        direction: "Aviles",
        latitude:43.5580,
        longitude:-5.9247,
        comments: "",
        photoLink:[],
        category: "Coastal town"
    }

    const [markers, setMarkers] = useState<Place>(defaultPlace);

    const listPlaces: Place[] = [{        
        direction: "Calle Valdés Salas 11",        
        latitude: 43.35485,        
        longitude: -5.85123,        
        comments: "",        
        photoLink: [],
        category: "Biblioteca"
    },
    {
        direction: "Gijón",
        latitude: 43.5322,
        longitude: -5.6611,
        comments: "",
        photoLink: [],
        category: "Restaurante"
    },
    {
        direction: "Cudillero",
        latitude: 43.5616,
        longitude: -6.1529,
        comments: "",
        photoLink: [],
        category: "Restaurante"
    },
    {
        direction: "Lagos de Covadonga",
        latitude: 43.2809,
        longitude: -4.9468,
        comments: "",
        photoLink: [],
        category: "Monumento"
    },
    {
        direction: "Playa de Gulpiyuri",
        latitude: 43.4505,
        longitude: -4.8285,
        comments: "",
        photoLink: [],
        category: "Monumento"
    },
    {
        direction: "Parque Natural de Somiedo",
        latitude: 43.0483,
        longitude: -6.0833,
        comments: "",
        photoLink: [],
        category: "Monumento"
    },
    {
        direction: "Ruta del Cares",
        latitude: 43.2548,
        longitude: -4.9299,
        comments: "",
        photoLink: [],
        category: "Biblioteca"
    }];

    const handleClick = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        getMarkups();
    }

    var getMarkups = async () => {
        setMarkers(await getPlaces());
    }

    const centro:[number, number] = [43.35485, -5.85123]

    const filterPlaces = (places: Place[]) => {
        if(categorias.length == 0){
            return places;
        } else {
            return places.filter((place) => {
                const categoryMatch = categorias.includes(place.category);
                return categoryMatch;
              });
        }
      }

      function filterByDistance(center: [number, number], radiusInner: number, radiusOuter: number, places: Place[]): Place[] {
        const [centerLat, centerLng] = center;
        const result = places.filter(place => {
          const {latitude, longitude} = place;
          const distance = calculateDistance(centerLat, centerLng, latitude, longitude);
          return distance >= radiusInner && distance <= radiusOuter;
        });
        return result;
      }
      
      function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
        const R = 6371; // Radio de la tierra en kilómetros
        const dLat = toRadians(lat2 - lat1);
        const dLng = toRadians(lng2 - lng1);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
          Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distancia en kilómetros
        return d;
      }
      
      function toRadians(degrees: number): number {
        return degrees * Math.PI / 180;
      }
      

    const filteredPlaces = filterByDistance(centro, minDistance, maxDistance, filterPlaces(listPlaces));

    

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
                <MapContainer center={centro} zoom={13} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    
                    {filteredPlaces.map((position2, idx) =>
                        <Marker key={idx} position={[position2.latitude, position2.longitude]} icon={icon}>
                            <Popup>
                            {position2.direction}<br></br>
                            {position2.category}
                        </Popup>
                        </Marker>
                    )}
                </MapContainer>
            </div>
        </>
    );
}


export default Map;
