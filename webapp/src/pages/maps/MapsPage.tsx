import React from "react";
import NavigationMenu from "./components/NavigationMenu";
import Filters from "./components/Filters";
import Info from "./components/Info";
import Map from "./components/Map";
import './MapsPage.css';

import { MapContainer, TileLayer, useMap, useMapEvents  } from 'react-leaflet';
import {Marker, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


type MapProps = {
    
};

function MapsPage():JSX.Element{

    return (
        <>
            <div className="mapspage">

                {/*Barra de menu de navegación*/}
                <div className="menunavegacion">
                    <NavigationMenu/>
                </div>
                
                {/*Contenido*/}
                <div className="contenido">

                    {/*Contenido menusuperior*/}
                    <div className="left">
                        <Filters/>
                    </div>

                    {/*Contenido central */}
                    <div className="central">

                        {/*Mapa*/}
                        <div className="mapa">
                            <MapComponent/>
                        </div>

                        {/*Información*/}
                        <div className="informacion">
                            <Info/>
                        </div>
                    </div>
                </div>  
            </div>
        </>
    );
}

function MapComponent(props: MapProps): JSX.Element {
    let modalOpened=false;
    return (
        <>
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
                    <Map/>
                </MapContainer>
            </div>
            <div id="myModal" className="modal">    
                <div className="modal-content">
                <button id="closeModal" type="button" className="close" aria-label="Close">
                    <span>&times;</span>
                </button>
                <form id="formAñadirLugar">
                <p>Nombre: <input id="nombreLugar" type="text"></input></p>
                <p>Dirección: <input id="dirLugar" type="text"></input></p>
                <p>Descripción: <input id="descrpLugar" type="text"></input></p>
                <p>Comentario: <input id="comentLugar" type="text"></input></p>
                </form>
                <button id="añadirLugar" type="button" className="enviar"> Añadir lugar </button>
                
                </div>
            </div>
        </>
    );
}

export default MapsPage;
