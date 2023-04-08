import React, { useState } from "react";
import Dropdown from "./Dropdown";
import { Place} from "../../../shared/shareddtypes";
import { addMarker } from "../../../api/api";

type FormProps = {
}


function ModalFormAñadirLugar(props:FormProps):JSX.Element{

    const [newPlace, setNewPlace] = useState<Place>();
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
        if (nombreLugar != "") {
            modal!.style.display = "none";
            newPlace!.name = nombreLugar;
            newPlace!.direction = dirLugar;
            newPlace!.comments = "";
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

            
            <form id="formAñadirLugar" className='formAñadirLugar' onSubmit={guardarDatos}>
                <label>Nombre: <input id="nombreLugar" type="text" required></input></label>
                <label>Dirección: <input id="dirLugar" type="text" required></input></label>
                <label>Descripción: <input id="descrpLugar" type="text"></input></label>
                <label>Categoría:<Dropdown items={categories} dropdownTitle="Categorias" onChange={handleCategoriaChange}/> </label>
                <label>Fotos:<input type="file" id="fotos" accept="image/png, image/jpeg, image/jpg" multiple></input></label>
                <button id="pruebaguardar" type="submit"> Añadir Lugar</button>
            </form>            
        
        </>
    )

}

export default ModalFormAñadirLugar;