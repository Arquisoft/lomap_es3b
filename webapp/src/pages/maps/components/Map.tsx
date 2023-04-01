import L from "leaflet";
import { useMapEvents } from 'react-leaflet';
import { addMarker, getPlaces } from '../../../api/api';

import { Place } from '../../../shared/shareddtypes';

type MapProps = {
    
};

var lat:number;
var long: number;

 async function guardarLugar(lugarMarcado: any) {
     await addMarker(lugarMarcado); 
 }

const icon = new L.Icon({
    iconUrl: require('../../../assets/marker-icon.png'),
    iconSize: new L.Point(50, 50),
    iconAnchor: [25,50],
    className: 'leaflet-div-icon'
});


//Luego se cambiaran por las de la base de datos
let listPlaces:Place[] = [ {
    name:"Universidad Ingenieria Informatica",
    direction: "Calle Valdés Salas 11",
    latitude:43.35485,
    longitude:-5.85123,
    comments: "",
    photoLink:[]
    }]


/* const defaultPlace:Place = {
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
        const paGuardar:Place = {
            name: "PRUEBA INSERCION con comentario",
            direction: "Lugar 1234",
            latitude:lat,
            longitude:long,
            comments: "esto es una prueba",
            photoLink:[]
        }
        console.log("Preparado para guardar lugar en Map.tsx");
        guardarLugar(paGuardar);
        //guardarLugar(defaultPlace);
        //getMarkups();
    }

    let getMarkups = async () => {
        setMarkers(await getPlaces());   // PARA OBTENER LOS LUGARES DE MONGODB
    }
    let getMarkups = async () => {
        setMarkers(await getPlaces());
    } */
   

function Map(props: MapProps): JSX.Element {

    const map = useMapEvents({
        click(e) {    
            //abrir el modal
            let modal = document.getElementById("myModal");
            modal!.style.display = "block";
            //cerrar el modal al hacer click en cruz
            let botonCerrar = document.getElementById("closeModal");
            if (botonCerrar != undefined) {
                botonCerrar.onclick = function() {
                    modal!.style.display = "none";}
            }
            //Mandar informacion y añadir el lugar
            let botonAñadir = document.getElementById("añadirLugar");
            if (botonAñadir != undefined) {
                botonAñadir.onclick = function() {
                    let nombreLugar = (document.getElementById("nombreLugar") as HTMLInputElement).value;
                    let dirLugar = (document.getElementById("dirLugar") as HTMLInputElement).value;
                    let descrpLugar = (document.getElementById("descrpLugar") as HTMLInputElement).value;
                    let comentLugar = (document.getElementById("comentLugar") as HTMLInputElement).value;
                    if(nombreLugar!=""){
                        modal!.style.display = "none";
                        let element:Place = {
                            name:"",
                            direction: nombreLugar,
                            latitude:e.latlng.lat,
                            longitude:e.latlng.lng,
                            comments: comentLugar,
                            photoLink:[]
                        }
                        AddMarkerWithMap(element, map);
                        reiniciarModal();
                        
                    }
                } 
            }

        },            
    })

    //Añadir markers de listPlaces (Luego se cambiara por los que esten en la base de datos o el pod)
    for (const element of listPlaces) {
        AddMarker(element);
    }

     return (
            <>   
               
            </>
        );
    
}


function AddMarker(element:Place){
    const map = useMapEvents({});
    let marker = new L.Marker([element.latitude, element.longitude]);
    marker.setIcon(icon);
    map.addLayer(marker);
    marker.bindPopup(element.direction)
    marker.on('click', function(){ marker.openPopup() });
}

function AddMarkerWithMap(element:Place, map:L.Map){
    let marker = new L.Marker([element.latitude, element.longitude]);
    marker.setIcon(icon);
    map.addLayer(marker);
    marker.bindPopup(element.direction)
    marker.on('click', function(){ marker.openPopup() });
}

function reiniciarModal(){
    (document.getElementById("nombreLugar") as HTMLInputElement).value="";
    (document.getElementById("descrpLugar") as HTMLInputElement).value="";
    (document.getElementById("comentLugar") as HTMLInputElement).value="";
}




// const MapContent = () => {
//     const map = useMapEvents({
//         click(e) {              
//             var marker = new L.Marker([e.latlng.lat,e.latlng.lng]);  
//             lat = e.latlng.lat;
//             long = e.latlng.lng;
//             marker.setIcon(icon);
//             map.addLayer(marker);
//         },            
//     })

//     return (

//         <>   
           
//         </>
//     );
// }



export default Map;