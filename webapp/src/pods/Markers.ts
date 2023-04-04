import { Session } from "@inrupt/solid-client-authn-browser";
import { saveFileInContainer } from "@inrupt/solid-client";
import { MarkerDTO } from "../shared/shareddtypes";
import { json } from "body-parser";

async function addMarkerPOD(session: Session, name:string, file: File, url:string){

    try{
        await saveFileInContainer(url, file,{
            slug: file.name,
            contentType: file.type,
            fetch: session.fetch
        });
    }catch(error){
        console.log(error);
    }
}

async function getMarkersPOD(session: Session, url:string){
    //TO-DO
}

export default {addMarkerPOD, getMarkersPOD};