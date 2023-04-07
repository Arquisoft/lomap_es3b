import { useSession } from '@inrupt/solid-ui-react';
import React, { useEffect, useState } from "react";
import NavigationMenu from "./components/NavigationMenu";
import Filters from "./components/Filters";
import Info from "./components/Info";
import Map from "./components/Map";
import './MapsPage.css';
import { addMarkerPOD, getMarkersPOD } from '../../pods/Markers';
import Button from 'react-bootstrap/esm/Button';
import { addMarker, getPlaces } from "../../api/api";
import { Place, MarkerDTO } from "../../shared/shareddtypes";


type MapProps = {

};

function MapsPage(props: MapProps): JSX.Element {

    const [markers, setMarkers] = useState<Array<Place>>();
    const [selectedMarker, setSelectedMarker] = useState<Place>();
    const [newMarker, setNewMarker] = useState<L.Marker>();
    const [newPlace, setNewPlace] = useState<Place>();
    const [mostrarModal, setMostrarModal] = useState(false);
    const [filteredPlaces, setFilteredPlaces] = useState<Array<Place>>();
    const [categorias, setCategorias] = useState<string[]>([]);
    const [amigos, setAmigos] = useState<string[]>([]);
    const [minDistance, setMinDistance] = useState<number>(0);
    const [maxDistance, setMaxDistance] = useState<number>(0);

    const { session } = useSession();
    const { webId } = session.info;
    console.log(webId);

    const getMarkups = async () => {
        //Sacar la session
        //De la session sacar el webId
        //Asignar a un array el resultado de llamar a getMarkersPOD()
        let lugaresArray = await getPlaces();
        setMarkers(lugaresArray);
        setFilteredPlaces(filterByDistance(centro, minDistance, maxDistance, filterPlaces(lugaresArray)));
    }

    useEffect(() => {
        getMarkups();
    }, []);

    const centro: [number, number] = [43.35485, -5.85123]

    const filterPlaces = (places: Place[]) => {
        if (categorias.length == 0) {
            return places;
        } else {
            return places.filter((place) => {
                const categoryMatch = categorias.includes(place.category);
                return categoryMatch;
            });
        }
    }

    function filterByDistance(center: [number, number], radiusInner: number, radiusOuter: number, places: Place[]): Place[] {

        console.log(places);
        const [centerLat, centerLng] = center;
        const result = places.filter(place => {
            const { latitude, longitude } = place;
            const distance = calculateDistance(centerLat, centerLng, latitude, longitude);
            return distance >= radiusInner && distance <= radiusOuter;
        });
        console.log(result);
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

    function handleMarkerOnClick(p: Place): void {
        setNewMarker(undefined);
        setNewPlace(undefined);
        setSelectedMarker(p);
    }

    function handleNewMarkerOnClick(m: L.Marker): void {
        setSelectedMarker(undefined);
        setNewMarker(m);
        setMostrarModal(true);
        let p: Place = {
            name: "",
            direction: "",
            latitude: m.getLatLng().lat,
            longitude: m.getLatLng().lng,
            comments: "",
            photoLink: [],
            category: ""
        }
        setNewPlace(p);
    }

    async function guardarDatos() {
        //abrir el modal
        let modal = document.getElementById("myModal");
        //cerrar el modal al hacer click en cruz
        let botonCerrar = document.getElementById("closeModal");
        if (botonCerrar != undefined) {
            botonCerrar.onclick = function () {
                modal!.style.display = "none";
            }
        }

        let nombreLugar = (document.getElementById("nombreLugar") as HTMLInputElement).value;
        let dirLugar = (document.getElementById("dirLugar") as HTMLInputElement).value;
        let descrpLugar = (document.getElementById("descrpLugar") as HTMLInputElement).value;
        let commentLugar = (document.getElementById("comentLugar") as HTMLInputElement).value;
        if (nombreLugar != "") {
            modal!.style.display = "none";
            newPlace!.name = nombreLugar;
            newPlace!.direction = dirLugar;
            newPlace!.comments = commentLugar;
            newPlace!.photoLink = [];
        }
        reiniciarModal();
        //await addMarker(newPlace!);
        await guardarEnPOD(newPlace!);
    }


    function reiniciarModal() {
        (document.getElementById("nombreLugar") as HTMLInputElement).value = "";
        (document.getElementById("descrpLugar") as HTMLInputElement).value = "";
        (document.getElementById("comentLugar") as HTMLInputElement).value = "";
    }

    const handleCategoriaChange = (selectedOption: string[]) => {
        console.log(`Categoría seleccionada: ${selectedOption}`);
        setCategorias(selectedOption);
        setFilteredPlaces(filterByDistance(centro, minDistance, maxDistance, filterPlaces(markers!)));
    };

    const handleAmigoChange = (selectedOption: string[]) => {
        console.log(`Amigo seleccionado: ${selectedOption}`);
        setAmigos(selectedOption);
        setFilteredPlaces(filterByDistance(centro, minDistance, maxDistance, filterPlaces(markers!)));
    };

    const handleMinDistanceChange = (selectedMinDistance: number, selectedMaxDistance: number) => {
        console.log(`Distancia seleccionada: ${selectedMinDistance} y ${selectedMaxDistance}`);
        setMinDistance(selectedMinDistance);
        setMaxDistance(selectedMaxDistance);
        setFilteredPlaces(filterByDistance(centro, minDistance, maxDistance, filterPlaces(markers!)));
    };

    async function guardarEnPOD(place: Place) {


        var blob = new Blob([JSON.stringify(place)], { type: "aplication/json" });
        var file = new File([JSON.stringify(place)], "marker2.info", { type: "aplication/json"});

        await addMarkerPOD(session, file.name, file, webId!)

    }

    /*
    


    const markerPOD:MarkerDTO = {
        id:"1",
        name:"prueba",
        latitude: 43,
        longitude:-5.3,
    }

    var blob = new Blob([JSON.stringify(marker)],{type:"aplication/json"})

    var file = new File([blob], "marker.info", {type: blob.type});

    const handleOnClick = async () =>{
        await addMarkerPOD(session,file.name,file,webId!);
    }
    */

    return (
        <>
            <div className="mapspage">

                {/*Barra de menu de navegación*/}
                <div className="menunavegacion">
                    <NavigationMenu />
                </div>

                {/*Contenido*/}
                <div className="contenido">

                    {/*Contenido menusuperior*/}
                    <div className="left">
                        <Filters
                            onCategoriaChange={handleCategoriaChange}
                            onAmigoChange={handleAmigoChange}
                            onMinDistanceChange={handleMinDistanceChange}
                        />
                    </div>

                    {/*Contenido central */}
                    <div className="central">

                        {/*Mapa*/}
                        <div className="mapa">
                            <Map markers={filteredPlaces!}
                                funcNewMarker={(m: L.Marker) => { handleNewMarkerOnClick(m); }}
                                funcSelectedMarker={(m: Place) => { handleMarkerOnClick(m); }}
                                newMarker={newMarker}
                            />
                        </div>

                        {/*Información*/}
                        <div className="informacion">
                            {selectedMarker && !newMarker ? <Info /> : !selectedMarker && newMarker && mostrarModal ?
                                <div id="myModal" className="modal">
                                    <div className="modal-content">
                                        <button id="closeModal" type="button" className="close" onClick={() => setMostrarModal(false)} aria-label="Close">
                                            <span>&times;</span>
                                        </button>
                                        <form id="formAñadirLugar" onSubmit={guardarDatos}>
                                            <p>Nombre: <input id="nombreLugar" type="text"></input></p>
                                            <p>Dirección: <input id="dirLugar" type="text"></input></p>
                                            <p>Descripción: <input id="descrpLugar" type="text"></input></p>
                                            <p>Comentario: <input id="comentLugar" type="text"></input></p>
                                            <button id="pruebaguardar" type="submit"> Añadir Lugar</button>
                                        </form>
                                    </div>
                                </div> : <></>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MapsPage;
