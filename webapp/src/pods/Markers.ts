import { Session } from "@inrupt/solid-client-authn-browser";
import { saveFileInContainer } from "@inrupt/solid-client";
import { MarkerDTO } from "../shared/shareddtypes";
import { json } from "body-parser";
import { writeFile } from 'fs/promises';
import { getFile, isRawData, getContentType, getSourceUrl,getPodUrlAll  } from "@inrupt/solid-client";
import {Place} from "../shared/shareddtypes";

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

export async function getMarkersPOD(session: Session, url:string): Promise<Place[]>{

    let lug: any;
    if(session.info.isLoggedIn){
        const mypods = await getPodUrlAll(url, { fetch: fetch }); // aqui tengo las urls de TODAS las carpetas que hay en el pod

        let carpeta = ""; // busco la que almacena los lugares
        mypods.forEach((str) =>{
            if(str.endsWith("/places/")){ // EL NOMBRE DE LA CARPETA DEBE ESTAR ESPECIFICADO
                carpeta = str;
            }
        })

        lug = await readFileFromPod(carpeta, session);  
    }
    let arraySol: Place[] = [];

    if (lug) {
        arraySol.push(lug);
      }

    return Promise.resolve(arraySol);
}

async function readFileFromPod(fileURL:string , session:Session) {
    try {
      const fet = session.fetch;
      const file = await getFile(
        fileURL,               // File in Pod to Read
        { fetch: fet }       // fetch from authenticated session
      );

      let fileText = await file.text()
      let fileInfo = JSON.parse(fileText)

      let n = fileInfo.name;
      let d = fileInfo.direction;
      let lat = Number(fileInfo.latitude);
      let lon = Number(fileInfo.longitude);
      let cate = fileInfo.category;
      let com = fileInfo.comments;
      let photoLink = fileInfo.photoLink;

      let p: Place = {
        name: n,
        direction: d,
        latitude: lat,
        longitude: lon,
        comments: com,
        photoLink: photoLink,
        category: cate
    }

      console.log(`Fetched a ${getContentType(file)} file from ${getSourceUrl(file)}.`);
      console.log(`The file is ${isRawData(file) ? "not " : ""}a dataset.`);

      return p;
  
    } catch (err) {
      console.log(err);
      return null;
    }
  }

export default {addMarkerPOD, getMarkersPOD};