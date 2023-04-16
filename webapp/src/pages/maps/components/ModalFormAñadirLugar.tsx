import { Place, MapType } from "../../../shared/shareddtypes";
import { addMapPOD } from "../../../pods/Markers";
import { useSession } from "@inrupt/solid-ui-react";

import Combobox from "react-widgets/Combobox";
import "react-widgets/styles.css";


type FormProps = {
    mapas: MapType[];
    newPlace: Place | undefined;
    rechargeMarkers: () => void;
}


function ModalFormAñadirLugar(props: FormProps): JSX.Element {

    const { session } = useSession();
    const { webId } = session.info;

    let urlImagenes: string[] = [];

    const categories = [
        'Biblioteca',
        'Monumento',
        'Restaurante',
    ];

    const maps = [
        'MapaBase',
        'MapaNuevo'
    ]

    async function guardarEnPOD(place: Place, mapa: MapType, mapName:string) {

        let uniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2);

        mapa.id = mapName;
        mapa.map.push({id: uniqueId, place: place})

        var blob = new Blob([JSON.stringify(mapa)], { type: "aplication/json" });
        var file = new File([blob], mapName + ".info", { type: blob.type });

        var mapUrl = webId!.split("/profile")[0] + "/map/";

        await addMapPOD(session, mapName, file, mapUrl)
        console.log("Mapa actualizado");
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
        //let descrpLugar = (document.getElementById("descrpLugar") as HTMLInputElement).value;
        let categoria = (document.getElementById("categoria_input") as HTMLInputElement).value;
        let mapaSelected = (document.getElementById("mapa_input") as HTMLInputElement).value
        let fotos = (document.getElementById("fotos") as HTMLInputElement).files;
            
        //Añadimos las fotos al repositorio de cloudinary

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
            props.newPlace!.comments = "";
            props.newPlace!.photoLink = urlImagenes;
        }

        var mapa = props.mapas.find((m) => m.id === mapaSelected);
        if (mapa !== undefined && mapa !== null) {
            await guardarEnPOD(props.newPlace!, mapa, mapaSelected);
        }else{
            mapa = {id:mapaSelected, map:[]}
            await guardarEnPOD(props.newPlace!, mapa, mapaSelected);
        }
    }



    return (
        <>
            <form id="formAñadirLugar" className='formAñadirLugar' onSubmit={async (e) => {
                e.preventDefault();
                await guardarDatos();
                props.rechargeMarkers();
            }}>
                <label>Nombre: <input id="nombreLugar" type="text" required></input></label>
                <label>Dirección: <input id="dirLugar" type="text" required></input></label>
                <label>Descripción: <input id="descrpLugar" type="text"></input></label>
                <label>Categoría:
                    <Combobox
                        defaultValue={categories[0]}
                        data={categories}
                        name="categoria"
                        id="categoria"
                    />
                </label>
                <label>Fotos:<input type="file" id="fotos" accept="image/png, image/jpeg, image/jpg" multiple></input></label>
                <label>Mapa:
                    <Combobox
                        defaultValue={maps[0]}
                        data={maps}
                        name="mapa"
                        id="mapa"
                    />
                </label>
                <button id="pruebaguardar" type="submit"> Añadir Lugar</button>
            </form>

        </>
    )

}

export default ModalFormAñadirLugar;