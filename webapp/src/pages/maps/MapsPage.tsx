import React, { useEffect, useState } from "react";
import NavigationMenu from "./components/NavigationMenu";
import Filters from "./components/Filters";
import Info from "./components/Info";
import Map from "./components/Map";
import './MapsPage.css';
import { addMarker, getPlaces } from "../../api/api";
import { Place } from "../../shared/shareddtypes";


type MapProps = {

};

function MapsPage(props: MapProps): JSX.Element {

    const [markers, setMarkers] = useState<Array<Place>>();
    const [selectedMarker, setSelectedMarker] = useState<Place>();
    const [newMarker, setNewMarker] = useState<L.Marker>();
    const [newPlace, setNewPlace] = useState<Place>();
    const [mostrarModal, setMostrarModal] = useState(false);

    const getMarkups = async () => {

        let lugaresArray = await getPlaces();
        setMarkers(lugaresArray);
    }

    useEffect(() => {
        getMarkups();
    }, []);

    async function guardarLugar(lugarMarcado: any) {

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
        await addMarker(newPlace!);
    }


    function reiniciarModal() {
        (document.getElementById("nombreLugar") as HTMLInputElement).value = "";
        (document.getElementById("descrpLugar") as HTMLInputElement).value = "";
        (document.getElementById("comentLugar") as HTMLInputElement).value = "";
    }

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
                            {selectedMarker && !newMarker ? <Info /> : !selectedMarker && newMarker && mostrarModal ?
                                <div id="myModal" className="modal">
                                    <div className="modal-content">
                                        <button id="closeModal" type="button" className="close" onClick={()=>setMostrarModal(false)} aria-label="Close">
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
