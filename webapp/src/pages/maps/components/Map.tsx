import L from "leaflet";
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getPlaces, addMarker } from '../../../api/api';
import React, { useState, useEffect } from 'react';
import { Place } from '../../../shared/shareddtypes';


type MapProps = {
    markers: Array<Place>;
    funcNewMarker: (p:L.Marker) => void;
    funcSelectedMarker: (p:Place) => void;
    newMarker: L.Marker|undefined;
    categorias: string[];
    amigos: string[];
    minDistance: number;
    maxDistance: number;
};

const icon = new L.Icon({
    iconUrl: require('../../../assets/marker-icon.png'),
    iconSize: new L.Point(50, 50),
    iconAnchor: [25, 50],
    className: 'leaflet-div-icon'
});

function Map({ categorias, amigos, minDistance, maxDistance, ...props }: MapProps): JSX.Element {


    const defaultPlace: Place = {
        name: "Ronda 14",
        direction: "Aviles",
        latitude: 43.5580,
        longitude: -5.9247,
        comments: "",
        photoLink:[],
        category: "Restaurante"
    }

    const MapContent = () => {
        const map = useMapEvents({
            click(e) {
                if (props.newMarker) {
                    map.removeLayer(props.newMarker);
                }
                var marker = new L.Marker([e.latlng.lat, e.latlng.lng]);
                props.funcNewMarker(marker);
                marker.setIcon(icon);
                map.addLayer(marker);
            },
        })
    
        return (
            <>

            </>
        );
    }

    type markerProps = {
        marker:Place
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

    const CustomMarker = function(propsM:markerProps) {
        const map = useMap()

        return (<Marker 
            key={propsM.marker.direction}
            position={[propsM.marker.latitude,propsM.marker.longitude]}
            icon={icon}
            eventHandlers={{
                click: (e) => {
                    if(props.newMarker){
                        map.removeLayer(props.newMarker!);
                    }
                    props.funcSelectedMarker(propsM.marker);
                },
            }}
        >
        <Popup>
            {propsM.marker.direction}
        </Popup>
        </Marker>
        );
    }

    return (
        <>
            <div className="buscador">
                <input type="text" name="buscar"></input>
                <button> 🔍︎ Buscar  </button>
            </div>
            <div className="map">
                <MapContainer center={[43.35485, -5.85123]} zoom={13} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MapContent />

                    {Array.isArray(props.markers) && filteredPlaces.map((marker) =>
                        <CustomMarker marker={marker}/>
                    )}
                </MapContainer>
            </div>
        </>
    );
}

export default Map;