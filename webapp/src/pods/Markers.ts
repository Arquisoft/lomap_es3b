import { Session } from "@inrupt/solid-client-authn-browser";
import { saveFileInContainer } from "@inrupt/solid-client";
import { MarkerDTO } from "../shared/shareddtypes";
import { json } from "body-parser";
import { writeFile } from 'fs/promises';
import { getFile, isRawData, getContentType, getSourceUrl,isContainer,getResourceInfo } from "@inrupt/solid-client";
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
      /** 
        let carpeta = ""; // busco la que almacena los lugares
        mypods.forEach((str) =>{
            if(str.endsWith("/map/")){
                carpeta = str;
            }
        })
      */
        lug = await readFileFromPod(url + "/marker.info", session);
        console.log(lug);
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
      console.log(fileText);
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