import React, { useEffect, useState } from "react";
import NavigationMenu from "./components/NavigationMenu";
import Filters from "./components/Filters";
import Map from "./components/Map";
import Info from "./components/Info";
import './MapsPage.css';
import { addMarker, getPlaces } from "../../api/api";
import { Place } from "../../shared/shareddtypes";


function MapsPage(): JSX.Element {

    const [markers, setMarkers] = useState<Array<Place>>();
    const [selectedMarker, setSelectedMarker] = useState<Place>();
    const [newMarker, setNewMarker] = useState<L.Marker>();
    const [newPlace, setNewPlace] = useState<Place>();


    const getMarkups = async () => {

        let lugaresArray = await getPlaces();
        setMarkers(lugaresArray);
    }

    async function guardarLugar(lugarMarcado: any) {
        await addMarker(lugarMarcado);
    }

    // BOTON CARGAR
    const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newMarker) {
            const paGuardar: Place = {
                name: "PRUEBA INSERCION con comentario",
                direction: "Lugar 1234",
                latitude: newMarker?.getLatLng().lat!,
                longitude: newMarker?.getLatLng().lng!,
                comments: "esto es una prueba",
                photoLink: [],
                category: "Restaurante"
            }
            console.log("Preparado para guardar lugar en Map.tsx");
            guardarLugar(paGuardar);
        }
    }

    function handleMarkerOnClick(p: Place): void {
        setNewMarker(undefined);
        setNewPlace(undefined);
        setSelectedMarker(p);
    }

    function handleNewMarkerOnClick(m: L.Marker): void {
        setSelectedMarker(undefined);
        setNewMarker(m);
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

    useEffect(() => {
        getMarkups();
    },[]);

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
                        <Filters />
                    </div>

                    {/*Contenido central */}
                    <div className="central">

                        {/*Mapa*/}
                        <div className="mapa">
                            <Map markers={markers!} funcNewMarker={(m: L.Marker) => { handleNewMarkerOnClick(m); }} funcSelectedMarker={(m: Place) => { handleMarkerOnClick(m); }} newMarker={newMarker} />
                        </div>

                        {/*Información*/}
                        <div className="informacion">
                            {selectedMarker && !newMarker ? <Info /> : !selectedMarker && newMarker?<form name="lugares" onSubmit={handleClick}>
                                <button id="pruebaguardar" type="submit"> Cargar</button>
                            </form>:<></>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MapsPage;
