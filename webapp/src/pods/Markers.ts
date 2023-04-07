import { Session } from "@inrupt/solid-client-authn-browser";
import { saveFileInContainer } from "@inrupt/solid-client";
import { MarkerDTO } from "../shared/shareddtypes";
import { json } from "body-parser";

export async function addMarkerPOD(session: Session, name:string, file: File, url:string){

    var mapUrl = url.split("/profile")[0] + "/map";
    
    try{
        await saveFileInContainer(mapUrl, file,{
            slug: file.name,
            contentType: file.type,
            fetch: session.fetch
        });
    }catch(error){
        console.log(error);
    }
}

export async function getMarkersPOD(session: Session, url:string){
    //TO-DO
}