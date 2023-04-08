import React, { useState } from "react";
import Dropdown from "./Dropdown";
import { Place } from "../../../shared/shareddtypes";
import { addMarkerPOD } from "../../../pods/Markers";
import { useSession } from "@inrupt/solid-ui-react";

import Combobox from "react-widgets/Combobox";
import "react-widgets/styles.css";



type FormProps = {
    newPlace: Place | undefined;
    rechargeMarkers: () => void;
}


function ModalFormAñadirLugar(props: FormProps): JSX.Element {

    const { session } = useSession();
    const { webId } = session.info;

    const [categorias, setCategorias] = useState<string[]>([]);
    const handleCategoriaChange = (selectedOption: string[]) => {
        console.log(`Categoría seleccionada: ${selectedOption}`);
        setCategorias(selectedOption);
    };
    const categories = [
        'Biblioteca',
        'Monumento',
        'Restaurante',
    ];

    async function guardarEnPOD(place: Place) {

        let uniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2);

        var blob = new Blob([JSON.stringify(place)], { type: "aplication/json" });
        var file = new File([blob], uniqueId + ".info", { type: blob.type });

        var mapUrl = webId!.split("/profile")[0] + "/map/";
        
        await addMarkerPOD(session, file.name, file, mapUrl)
        console.log("Lugar añadido");
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
        //let descrpLugar = (document.getElementById("descrpLugar") as HTMLInputElement).value;
        let categoria =  (document.getElementById("categoria_input") as HTMLInputElement).value;
        let fotos = (document.getElementById("fotos") as HTMLInputElement).value;
        console.log(fotos);
        if (nombreLugar != "") {
            modal!.style.display = "none";
            props.newPlace!.name = nombreLugar;
            props.newPlace!.direction = dirLugar;
            props.newPlace!.category=categoria;
            props.newPlace!.comments = "";
            props.newPlace!.photoLink = [];
        }
        //reiniciarModal();
        console.log(props.newPlace!);
        await guardarEnPOD(props.newPlace!);
    }

    /*
    function reiniciarModal() {
        (document.getElementById("nombreLugar") as HTMLInputElement).value = "";
        (document.getElementById("descrpLugar") as HTMLInputElement).value = "";
        (document.getElementById("comentLugar") as HTMLInputElement).value = "";
    }
    */



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
                <button id="pruebaguardar" type="submit"> Añadir Lugar</button>
            </form>

        </>
    )

}

export default ModalFormAñadirLugar;