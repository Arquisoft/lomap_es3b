import { useSession } from '@inrupt/solid-ui-react';
import { useState } from "react";
import NavigationMenu from "./components/NavigationMenu";
import ModalFormAñadirLugar from "./components/ModalFormAñadirLugar"
import Filters from "./components/Filters";
import Info from "./components/Info";
import Map from "./components/Map";
import './MapsPage.css';
import { getMapsPOD } from '../../pods/Markers';
import { PlacePOD, Place, MapType, Friend } from "../../shared/shareddtypes";
import { getFriends, getFriendsMapsPOD } from '../../pods/Friends';
import Amigos from './components/Amigos';

type MapProps = {

};

function MapsPage(props: MapProps): JSX.Element {
    const [filteredFriends, setFilteredFriends] = useState<Array<Friend>>([]);
    const [maps, setMaps] = useState<Array<MapType>>([]);
    const [selectedMarker, setSelectedMarker] = useState<PlacePOD>();
    const [newMarker, setNewMarker] = useState<L.Marker>();
    const [newPlace, setNewPlace] = useState<Place>();
    const [mostrarModal, setMostrarModal] = useState(false);
    const [filteredPlaces, setFilteredPlaces] = useState<Array<PlacePOD>>();
    const [categorias, setCategorias] = useState<string[]>([]);
    const [friends, setFriends] = useState<Array<Friend>>([]);
    const [filteredMaps, setFilteredMaps] = useState<MapType[]>([]);
    const [minDistance, setMinDistance] = useState<number>(0);
    const [maxDistance, setMaxDistance] = useState<number>(30);
    const [onlyOnce, setOnlyOnce] = useState(true);

    const { session } = useSession();

    //De la session sacar el webId
    const { webId } = session.info;
    console.log(webId);

    const containsMap = (MapsList: MapType[], mapa: MapType) => {

        if(MapsList === undefined || MapsList === null || MapsList.length === 0){
            return 0;
        }

        for(let i=0; i<MapsList.length; i++){
            if(MapsList[i].id === mapa.id && MapsList[i].owner === mapa.owner){
                return true;
            }
        }
        return false;
    }

    const getMarkups = async () => {

        //Asignar a un array el resultado de llamar a getMarkersPOD()

        setSelectedMarker(undefined);
        setNewPlace(undefined);
        setNewMarker(undefined);

        let mapasTotales: MapType[] = [];
        let placesTotales: PlacePOD[] = [];

        //Sacamos nuestros mapas
        let mapasPropios: MapType[] = await getMapsPOD(session, webId!.split("/profile")[0] + "/public/map/");

        mapasPropios.map((mapa) => {
            if (!containsMap(mapasTotales,mapa)) {
                mapasTotales.push(mapa);
                mapa.map.map((place)=>placesTotales.push(place));
            }
            return null;
        })

        console.log("Sacamos los amigos")
        //Sacamos a nuestros amigos
        let amigos = await getFriends(webId!).then((friendsPromise) => {
            return friendsPromise;
        });

        console.log("Sacamos los mapas de los amigos")
        //Sacamos los mapas de los amigos
        let mapasAmigos = await getFriendsMapsPOD(session, amigos);

        mapasAmigos.map((mapa) => {
            if (!containsMap(mapasTotales,mapa)) {
                mapasTotales.push(mapa);

                mapa.map.map((place)=>{
                    placesTotales.push(place);
                    return null;
                })
            }
            return null;
        });



    //Establecemos los mapas
    setMaps(mapasTotales);
    setFilteredMaps(mapasTotales);

    //Establecemos los amigos
    setFriends(amigos);
    setFilteredFriends([]);

    //Establecemos los lugares
    setFilteredPlaces(filterByDistance(centro, minDistance, maxDistance, filterByFriends(filterByCategory(placesTotales))));
}

if (session.info.isLoggedIn && onlyOnce) {
    setOnlyOnce(false);
    console.log(webId);
    getMarkups();
}

session.onLogout(() => {
    setMaps([]);
    setFriends([]);
    setFilteredPlaces([]);;
})

const centro: [number, number] = [43.35485, -5.85123]

const filterByCategory = (places: PlacePOD[]) => {
    if (places !== undefined && places !== null) {
        if (categorias.length === 0) {
            return places;
        } else {
            return places.filter((place) => {
                const categoryMatch = categorias.includes(place.place.category);
                return categoryMatch;
            });
        }
    } else {
        return [];
    }
}

function filterByFriends(places: PlacePOD[]): PlacePOD[]{
    console.log("Amigos para filtrar");
    console.log(filteredFriends);

    console.log("Lugares antes de filtrar")
    console.log(places);

    if (places !== undefined && places !== null) {
        if (filteredFriends.length === 0) {
            return places;
        } else {
            return places.filter((place) => {
                for(let i = 0; i<filteredFriends.length; i++){
                    if(filteredFriends[i].webId === place.owner){
                        return true;
                    }
                }
                return false;
            });
        }
    } else {
        return [];
    }
}

function filterByDistance(center: [number, number], radiusInner: number, radiusOuter: number, places: PlacePOD[]): PlacePOD[] {
    const [centerLat, centerLng] = center;
    const result = places.filter(place => {
        const { latitude, longitude } = place.place;
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

function handleMarkerOnClick(p: PlacePOD): void {
    setNewMarker(undefined);
    setNewPlace(undefined);
    setSelectedMarker(p);
}

/**
 * Pone el marcador cuando se hace click en el mapa para mostrar
 */
function handleNewMarkerOnClick(m: L.Marker): void {
    if (session.info.isLoggedIn) {
        setSelectedMarker(undefined);
        setNewMarker(m);
        setMostrarModal(true);
        let lugar: Place = {
            name: "",
            direction: "",
            latitude: m.getLatLng().lat,
            longitude: m.getLatLng().lng,
            comments: [],
            photoLink: [],
            category: "",
            rating: 0.0
        }
        setNewPlace(lugar);
    }
}


const handleCategoriaChange = (selectedOption: string[]) => {
    console.log(`Categoría seleccionada: ${selectedOption}`);

    if(selectedOption.length===0){
        setCategorias([]);
    }else{
        setCategorias(selectedOption);
    }
    
};

const handleAmigoChange = (selectedOption: string[]) => {
    console.log(`Amigo seleccionado: ${selectedOption}`);

    let selectedFriends = friends.filter((amigo) =>{
        return selectedOption.includes(amigo.name);
    })

    if(selectedFriends.length === 0){
        setFilteredFriends([]);
    }else{
        setFilteredFriends(selectedFriends);
    }
};

const handleMapaChange = (selectedOption: string[]) => {
    console.log(`Mapa seleccionado: ${selectedOption}`);

    let selectedMaps = maps.filter((mapa) =>{
        return selectedOption.includes(mapa.id);
    })

    if(selectedOption.length===0){
        setFilteredMaps(maps);
    }else{
        setFilteredMaps(selectedMaps);
    }
    
};

const handleMinDistanceChange = (selectedMinDistance: number, selectedMaxDistance: number) => {
    console.log(`Distancia seleccionada: ${selectedMinDistance} y ${selectedMaxDistance}`);
    setMinDistance(selectedMinDistance);
    setMaxDistance(selectedMaxDistance);
};

const handleButtonClick = () => {
    console.log("Monstrando todos los puntos entre " + minDistance + " y " + maxDistance + " que entren en las categorias " +
        categorias);

    let filteredMapPlaces: PlacePOD[] = [];

    console.log(filteredMaps);

    filteredMaps.map((mapa) => {
        mapa.map.map((place) => filteredMapPlaces.push(place));
        return null;
    });

    console.log(filteredMapPlaces);

    setFilteredPlaces(filterByDistance(centro, minDistance, maxDistance, filterByFriends(filterByCategory(filteredMapPlaces))));
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
                        mapas={maps}
                        friends={friends}
                        onCategoriaChange={handleCategoriaChange}
                        onAmigoChange={handleAmigoChange}
                        onMapaChange={handleMapaChange}
                        onMinDistanceChange={handleMinDistanceChange}
                        onButtonClick={handleButtonClick}
                    />
                    <Amigos friends={friends} />
                </div>

                {/*Contenido central */}
                <div className="central">

                    {/*Mapa*/}
                    <div className="mapa">
                        <Map markers={filteredPlaces!}
                        funcNewMarker={(m: L.Marker) => { handleNewMarkerOnClick(m); } }
                        funcSelectedMarker={(m: PlacePOD) => { handleMarkerOnClick(m); } }
                        newMarker={newMarker} selectedMarker={selectedMarker}/>
                    </div>

                    {/*Información*/}
                    <div className="informacion">
                        {selectedMarker && !newMarker ? <Info place={selectedMarker} /> : !selectedMarker && newMarker && mostrarModal ?
                            <div id="myModal" className="modal">
                                <div className="modal-content">
                                    <button id="closeModal" type="button" className="close btn btn-primary" onClick={() => setMostrarModal(false)} aria-label="Close">
                                        <span>&times;</span>
                                    </button>
                                    <ModalFormAñadirLugar newPlace={newPlace} rechargeMarkers={() => { getMarkups(); }} mapas={maps!} />
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
