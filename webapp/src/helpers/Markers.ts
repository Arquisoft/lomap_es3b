import { Session } from "@inrupt/solid-client-authn-browser";
import { saveFileInContainer } from "@inrupt/solid-client";
import { MarkerDTO } from "../shared/shareddtypes";
import { json } from "body-parser";

async function addMarker(session: Session, name:string, file: File, url:string){

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

export default addMarker;