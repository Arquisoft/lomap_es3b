import { useSession } from '@inrupt/solid-ui-react';
import { useState } from "react";
import NavigationMenu from "./components/NavigationMenu";
import ModalFormAñadirLugar from "./components/ModalFormAñadirLugar"
import Filters from "./components/Filters";
import Info from "./components/Info";
import Map from "./components/Map";
import './MapsPage.css';
import { addMarkerPOD, getMarkersPOD } from '../../pods/Markers';
import { Place} from "../../shared/shareddtypes";



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
    const [maxDistance, setMaxDistance] = useState<number>(30);
    const [onlyOnce, setOnlyOnce] = useState(true);


    const { session } = useSession();

    //De la session sacar el webId
    const { webId } = session.info;
    console.log(webId);

   

    const getMarkups = async () => {

        //Asignar a un array el resultado de llamar a getMarkersPOD()
        let lugaresArray: any;
        lugaresArray = await getMarkersPOD(session, webId!.split("/profile")[0]+"/map/");
        setSelectedMarker(undefined);
        setNewPlace(undefined);
        setNewMarker(undefined);
        setMarkers(lugaresArray);
        setFilteredPlaces(filterByDistance(centro, minDistance, maxDistance, filterPlaces(lugaresArray)));
    }

    if (session.info.isLoggedIn && onlyOnce) {
        setOnlyOnce(false);
        console.log(webId);
        getMarkups();
    }

    const centro: [number, number] = [43.35485, -5.85123]

    const filterPlaces = (places: Place[]) => {
        if (categorias.length === 0) {
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
            const { latitude, longitude } = place;
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

    function handleMarkerOnClick(p: Place): void {
        setNewMarker(undefined);
        setNewPlace(undefined);
        setSelectedMarker(p);
    }

    /**
     * Pone el marcador cuando se hace click en el mapa para mostrar
     */
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

    const handleCategoriaChange = (selectedOption: string[]) => {
        console.log(`Categoría seleccionada: ${selectedOption}`);
        setCategorias(selectedOption);
    };

    const handleAmigoChange = (selectedOption: string[]) => {
        console.log(`Amigo seleccionado: ${selectedOption}`);
        setAmigos(selectedOption);
    };

    const handleMinDistanceChange = (selectedMinDistance: number, selectedMaxDistance: number) => {
        console.log(`Distancia seleccionada: ${selectedMinDistance} y ${selectedMaxDistance}`);
        setMinDistance(selectedMinDistance);
        setMaxDistance(selectedMaxDistance);
    };

    const handleButtonClick = () => {
        console.log("Monstrando todos los puntos entre " + minDistance + " y " + maxDistance + " que entren en las categorias " +
            categorias);
        setFilteredPlaces(filterByDistance(centro, minDistance, maxDistance, filterPlaces(markers!)));
    };

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
                        onButtonClick={handleButtonClick}
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
                            {selectedMarker && !newMarker ? <Info place={selectedMarker}/> : !selectedMarker && newMarker && mostrarModal ?
                                <div id="myModal" className="modal">
                                    <div className="modal-content">
                                        <button id="closeModal" type="button" className="close" onClick={() => setMostrarModal(false)} aria-label="Close">
                                            <span>&times;</span>
                                        </button>
                                        <ModalFormAñadirLugar newPlace={newPlace} rechargeMarkers={()=>{getMarkups();}}/>
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
