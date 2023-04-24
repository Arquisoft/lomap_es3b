import type { Friend, Location, MapType } from "../shared/shareddtypes";
import { fetch, Session } from "@inrupt/solid-client-authn-browser";

import {
  Thing,
  getThing,
  getSolidDataset,
  getUrlAll,
  getStringNoLocale,
  getFile,
  getContentType,
  isRawData,
  getSourceUrl

} from "@inrupt/solid-client";

import { FOAF } from "@inrupt/vocab-common-rdf"

export async function getUserProfile(webID: string) {
  let profile = webID.split("#")[0];
  let dataSet = await getSolidDataset(profile, { fetch: fetch });
  return getThing(dataSet, webID) as Thing;
}

export async function getFriends(webId: string) {

  let friendURLs = getUrlAll(await getUserProfile(webId), FOAF.knows);
  let friends: Friend[] = [];

  for (let friend of friendURLs) {
    // This solution is very ugly, might need some fixing later...
    if (friend.split("/profile/card").length == 1)
      friend += "profile/card#me";

    let name = getStringNoLocale(
      await getUserProfile(friend),
      FOAF.name
    ) as string;

    if (friend && friend != webId)
      friends.push({
        name: name,
        webId: friend.split("profile/card#me")[0]
      });

  }
  return friends;
}


export async function getFriendsMapsPOD(session: Session, friends: Friend[]): Promise<MapType[]> {
  let mapas: MapType[] = [];
  let map: MapType;

  for (let i = 0; i < friends.length; i++) {
    
    if (session.info.isLoggedIn) {

      const fet = session.fetch;

      try {

        let file = await getFile(
          friends[i].webId + "public/map/",               
          { fetch: fet }       
        )

        let fileText = await file.text()
        console.log(fileText);

        //Buscamos los mapas guardados

        var nombreMapas: string[] = []

        if (fileText.includes("ldp:contains")) {
          nombreMapas = fileText.split("ldp:contains")[1].split(";")[0].replaceAll(">", "").replaceAll("<", "").replaceAll(" ", "").split(",");
        }

        if (nombreMapas.length === 0) {
          return [];
        } else {
          for (var j = 0; j < nombreMapas.length; j++) {
            map = await readFileFromPod(friends[i].webId + "/public/map/" + nombreMapas[j], session, nombreMapas[j]);
            if (map) {
              mapas.push(map);
            }
          }
        }
      } catch (err) {
        console.log("No tienes permisos de lectura de este POD o bien no existe la carpeta");
        console.log(err);
      }
    }
  }

  console.log(mapas);
  
  return Promise.resolve(mapas);
}

async function readFileFromPod(fileURL: string, session: Session, name: string): Promise<MapType> {
  try {
    const fet = session.fetch;
    const file = await getFile(
      fileURL,               // File in Pod to Read
      { fetch: fet }       // fetch from authenticated session
    );

    let fileText = await file.text()
    let fileInfo = JSON.parse(fileText)

    console.log(`Fetched a ${getContentType(file)} file from ${getSourceUrl(file)}.`);
    console.log(`The file is ${isRawData(file) ? "not " : ""}a dataset.`);

    return fileInfo;

  } catch (err) {
    console.log(err);
    return Promise.reject();
  }
}