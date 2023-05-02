import { Place, MapType, CommentType } from "../../../shared/shareddtypes";
import { addMapPOD } from "../../../pods/Markers";
import { useSession } from "@inrupt/solid-ui-react";
import { useState } from "react";

import Combobox from "react-widgets/Combobox";
import DropdownList from "react-widgets/DropdownList";
import "react-widgets/styles.css";
import StarRatings from 'react-star-ratings';
import { getProfileName } from "../../../pods/Profile";
import { addMarker } from "../../../api/api";


type FormProps = {
    mapas: MapType[];
    newPlace: Place | undefined;
    rechargeMarkers: () => void;
}


function ModalFormAñadirLugar(props: FormProps): JSX.Element {

    const { session } = useSession();
    const { webId } = session.info;
    const [rating, setRating] = useState(0);
    const [dir, setDir] = useState("");
    const [submitButton, setSubmitButton] = useState("POD");
    getDirectionFromAPI(props.newPlace!.latitude, props.newPlace!.longitude).then((data) => { setDir(data) });


    let urlImagenes: string[] = [];

    const categories = [
        'Biblioteca',
        'Monumento',
        'Restaurante',
        'Tienda',
        'Parking'
    ];

    const maps: string[] = [];

    props.mapas.forEach((mapa) => {
        console.log(session.info.webId!)
        console.log(mapa.owner)
        if (mapa.owner === session.info.webId!.split("profile")[0]) {
            maps.push(mapa.id)
        }
    })

    async function guardarEnPOD(place: Place, mapa: MapType, mapName: string) {

        let uniqueId = crypto.randomUUID();

        mapa.id = mapName;

        mapa.map.push({
            id: uniqueId,
            place: place,
            owner: mapa.owner,
        })

        var blob = new Blob([JSON.stringify(mapa)], { type: "aplication/json" });
        var file = new File([blob], mapName + ".info", { type: blob.type });

        var mapUrl = webId!.split("/profile")[0] + "/public/map/";

        await addMapPOD(session, mapName, file, mapUrl)
        console.log("Mapa actualizado");
    }

    async function getDirectionFromAPI(lat: number, lng: number) {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCfMMAO1EahrSRx2oo4bdtS6HKEvuslKvE`);
        console.log(lat);
        console.log(lng);
        const data = await response.json();
        if (data.status === "OK") {
            const address: string = data.results[0].formatted_address;
            return address;
        } else {
            throw new Error(`Error al obtener la dirección. Status: ${data.status}`);
        }
    }

    async function guardarDatos() {
        //abrir el modal
        let modal = document.getElementById("myModal");
        //cerrar el modal al hacer click en cruz
        let botonCerrar = document.getElementById("closeModal");
        if (botonCerrar !== undefined && botonCerrar !== null) {
            botonCerrar.onclick = function () {
                modal!.style.display = "none";
            }
        }

        //Recuperamos los datos del formulario

        let nombreLugar = (document.getElementById("nombreLugar") as HTMLInputElement).value;
        let dirLugar = (document.getElementById("dirLugar") as HTMLInputElement).value;
        let comentarioLugar = (document.getElementById("commentLugar") as HTMLInputElement).value;
        let categoria = (document.getElementsByName("categoria")[0] as HTMLInputElement).value;
        let mapaSelected = (document.getElementById("mapa_input") as HTMLInputElement).value
        let fotos = (document.getElementById("fotos") as HTMLInputElement).files;

        let idComentario = crypto.randomUUID();

        let name = await getProfileName(webId!);

        let comentario: CommentType = {
            id: idComentario,
            webId: webId!,
            name: name,
            date: new Date(),
            text: comentarioLugar
        }

        console.log(comentario.date);

        let puntuacion = rating;

        if (fotos) {
            const formData = new FormData();
            for (let i = 0; i < fotos!.length; i++) {
                formData.append("file", fotos[i]);
                formData.append("upload_preset", "docs_upload_example_us_preset");
                await fetch('https://api.cloudinary.com/v1_1/demo/image/upload',
                    {
                        mode: 'cors',
                        method: "POST",
                        body: formData
                    })
                    .then((response) => {
                        return response.text();
                    })
                    .then((data) => {
                        urlImagenes.push(JSON.parse(data)["url"]);
                    });
            }
        }

        if (nombreLugar !== "") {
            modal!.style.display = "none";
            props.newPlace!.name = nombreLugar;
            props.newPlace!.direction = dirLugar;
            props.newPlace!.category = categoria;
            if (!comentarioLugar) {
                props.newPlace!.comments = [];
            } else {
                props.newPlace!.comments = [comentario];
            }
            props.newPlace!.photoLink = urlImagenes;
            props.newPlace!.rating = puntuacion;
        }

        if (submitButton === "POD") {           

            var mapa = props.mapas.find((m) => m.id === mapaSelected && m.owner === webId?.split("profile")[0]);

            if (mapa !== undefined && mapa !== null) {
                await guardarEnPOD(props.newPlace!, mapa, mapaSelected);
            } else {
                var x = await getProfileName(webId!);
                if(mapaSelected === undefined || mapaSelected === null || mapaSelected === ""){
                    mapaSelected = "NewMap";
                }
                mapa = { id: mapaSelected, map: [], owner: webId!.split("profile")[0], ownerName: x }
                await guardarEnPOD(props.newPlace!, mapa, mapaSelected);
            }
        }else{
            await addMarker(props.newPlace!);
        }
    }

    return (
        <>
            <form id="formAñadirLugar" className='formAñadirLugar' onSubmit={async (e) => {
                e.preventDefault();
                await guardarDatos();
                props.rechargeMarkers();
            }}>

                <StarRatings
                    rating={rating}
                    name="rating"
                    starRatedColor="orange"
                    starHoverColor="orange"
                    changeRating={setRating}
                    numberOfStars={5}
                    starDimension="30px"
                    starSpacing="5px"
                />
                <label>Nombre: <input id="nombreLugar" type="text" className="inputForm" required></input></label>
                <label>Dirección: <input id="dirLugar" type="text" className="inputForm" defaultValue={dir} required></input></label>
                <label>Comentario: <input id="commentLugar" type="text" className="inputForm"></input></label>
                <label>Categoría:
                    <DropdownList
                        defaultValue={categories[0]}
                        data={categories}
                        name="categoria"
                        id="categoria"
                    />
                </label>

                <label>Mapa:
                    <Combobox
                        placeholder="Nombre del mapa"
                        defaultValue={maps.length === 0 ? maps[0] : ""}
                        data={maps}
                        name="mapa"
                        id="mapa"
                    />
                </label>

                <label>Fotos:<input type="file" id="fotos" accept="image/png, image/jpeg, image/jpg" multiple></input></label>
                <button id="guardarPOD" className="submit btn btn-primary" name="submitPOD" type="submit" onClick={() => setSubmitButton("POD")}> Añadir POD</button>
                <button id="guardarBBDD" className="submit btn btn-primary" name="submitBBDD" type="submit" onClick={() => setSubmitButton("BBDD")}> Añadir BBDD</button>
            </form>

        </>
    )

}

export default ModalFormAñadirLugar;