import type { Friend, Location } from "../../../../shared/shareddtypes";
import { fetch, Session } from "@inrupt/solid-client-authn-browser";

import {
  Thing,
  getThing,
  getSolidDataset,
  createSolidDataset,
  getUrl,
  getUrlAll,
  getStringNoLocale,
  createContainerAt,
  saveSolidDatasetAt,
  SolidDataset,
  addUrl,
  addStringNoLocale,
  buildThing,
  createThing,
  setThing,

} from "@inrupt/solid-client";

import { FOAF, RDF } from "@inrupt/vocab-common-rdf"

const RUTA_LOMAP = "lomap";
const RUTA_LOCATIONS = RUTA_LOMAP + "/locations";
const URL_VOCABULARIO = "http://w3id.org/lomap/";

// Returns a user profile as a Thing
export async function getUserProfile(webID: string) {
  let profile = webID.split("#")[0];
  let dataSet = await getSolidDataset(profile, { fetch: fetch });
  return getThing(dataSet, webID) as Thing;
}

// Returns all friends as a list
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

export async function getLocations(amigos: Friend[]) {
  amigos.forEach(amigo => {
    const rutaDataset = amigo.webId + "map/";
    console.log("getLocation --> ruta location: ", rutaDataset);
  });
}

export async function getLocation(session: Session, idLocation: string) {
  console.log("Entrando en getLocation");
  //Si no estamo en sesión retornamos null
  if (!session || !session.info.isLoggedIn) return;
  //Conseguimos la URL de almacenamiento del POD
  const urlPOD = await getStorageURL(session);
  //Construimos la ruta del dataset de la Location
  const rutaDataset = urlPOD + RUTA_LOCATIONS + "/" + idLocation;
  console.log("getLocation --> ruta location: ", rutaDataset);
  //Pedimos el dataset de la Location al POD
  let datasetLocation = await getDataset(session, rutaDataset);
  if (datasetLocation === null) {
    return null;
  }
  console.log("getLocation --> datasetLocation: ", datasetLocation);
  //Construimos la ruta de la Location (thing)
  const rutaThing = rutaDataset + "#" + idLocation;
  console.log("getLocation --> rutaThing: ", rutaThing);
  const locationThing = await getThing(datasetLocation!, rutaThing);
  console.log("getLocation --> locationThing: ", locationThing);
  return locationThing;
}

export async function saveLocation(session: Session, location: Location) {

  //Crear Dataset
  const urlPOD = await getStorageURL(session);
  const rutaDataset = urlPOD + RUTA_LOCATIONS + "/" + location.id;
  console.log("ruta dataset: ", rutaDataset);
  let nuevoDataset = await getOrCreateDataset(session, rutaDataset);
  console.log("nuevoDataset: ", nuevoDataset);

  //Transformamos coordenadas y score de número a String
  const latitudeString: string = Number(location.latitud).toString();
  const longitudeString: string = Number(location.longitud).toString();
  const scoreString: string = location.score !== null ? Number(location.score).toString() : "";

  //Crear Thing
  const nuevaLocationThing = buildThing(createThing({ name: location.id }))
    .addStringNoLocale(URL_VOCABULARIO + "id_location", location.id !== null ? location.id! : "")
    .addStringNoLocale(URL_VOCABULARIO + "name", location.name)
    .addStringNoLocale(URL_VOCABULARIO + "category", location.category)
    .addStringNoLocale(URL_VOCABULARIO + "latitude", latitudeString)
    .addStringNoLocale(URL_VOCABULARIO + "longitude", longitudeString)
    .addStringNoLocale(URL_VOCABULARIO + "comments", location.comments !== null ? location.comments! : "")
    .addStringNoLocale(URL_VOCABULARIO + "score", scoreString)
    .addUrl(RDF.type, URL_VOCABULARIO + "Location")
    .build();

  //Insertar thing en dataset
  nuevoDataset = await setThing(nuevoDataset!, nuevaLocationThing);

  //Guardar el dataset modificado en el POD
  const datasetGuardado = await saveSolidDatasetAt(
    rutaDataset,
    nuevoDataset,
    { fetch: fetch }             // fetch from authenticated Session
  );

  //Devolvemos la nueva location guardada en el pod
  const rutaNuevaLocationGuardada = rutaDataset + "#" + location.id
  const nuevaLocationGuardada = await getThing(datasetGuardado, rutaNuevaLocationGuardada);
  return nuevaLocationGuardada;
}

//Obtiene la URL de almacenamiento del POD a partir de la sesión iniciada por el usuario
async function getStorageURL(session: Session) {
  if (!session || !session.info.isLoggedIn) return;
  let storageUrl = "";
  await (async () => {
    const profileDataset = await getSolidDataset(session.info.webId!, {
      fetch: session.fetch,
    });

    const profileThing = await getThing(profileDataset, session.info.webId!);

    const STORAGE_PREDICATE = "http://www.w3.org/ns/pim/space#storage";
    const podsUrls = await getUrlAll(profileThing!, STORAGE_PREDICATE);

    storageUrl = podsUrls[0];
  })();
  return storageUrl;
}

//Obtiene un contenedor del Pod. Si no existe lo crea.
async function getOrCreateContainer(session: Session, ContainerURI: string) {
  if (!session || !session.info.isLoggedIn) return;
  try {
    const fetch = session.fetch;
    const containerDataset: SolidDataset = await createContainerAt(ContainerURI, { fetch });
    return containerDataset;
  } catch (error: any) {

    return error;
    /*
    console.log("Ver que error da al intentar crear un container que ya existe")
    console.log("error.statusCode: ",error.statusCode);
    console.log("error: ",error);
    ------
    if (error.statusCode === 404) {
      
      const todoList = await saveSolidDatasetAt(
        indexUrl,
        createSolidDataset(),
        {
          fetch,
        }
      );*/
  }
}

//Obtiene un dataset del pod. si no existe lo crea
async function getOrCreateDataset(session: Session, datasetURI: string) {
  if (!session || !session.info.isLoggedIn) return;
  try {
    const fetch = session.fetch;
    const dataset = await getSolidDataset(datasetURI, { fetch });
    return dataset;
  } catch (error: any) {
    if (error.statusCode === 404) {
      const dataset = await saveSolidDatasetAt(
        datasetURI,
        createSolidDataset(),
        {
          fetch,
        }
      );
      return dataset;
    }
  }
}

//Obtiene un dataset del pod. si no existe devuelve null
async function getDataset(session: Session, datasetURI: string) {
  if (!session || !session.info.isLoggedIn) return;
  try {
    const fetch = session.fetch;
    const dataset = await getSolidDataset(datasetURI, { fetch });
    return dataset;
  } catch (error: any) {
    if (error.statusCode === 404) {
      return null;
    }
  }
}

export async function pruebas(session: Session) {
  const jsonLocation = await getLocationJSON(session, "64337cca48c1302f714702ac");
  return jsonLocation;

  //const pruebaLocation = await getLocation (session, "64337cca48c1302f714702ac");
  //const pruebaLocation = await getLocation (session, "64337cca48c1302f7147");
  //console.log ("pruebaLocation: ", pruebaLocation);
  //const jsonLocation = parseLocation(session, pruebaLocation!);
  //console.log ("jsonLocation: ", jsonLocation);

  /*const urlAlmacenamiento = await getStorageURL(session);
  const rutaDataset = urlAlmacenamiento + RUTA_LOCATIONS + "/" + "64337cca48c1302f714702ac"+#+"64337cca48c1302f714702ac"
  const urlAlmacenamiento = await getStorageURL(session);
  const rutaDataset = urlAlmacenamiento + RUTA_LOCATIONS + "/pCD"
  console.log("ruta dataset: ", rutaDataset);
  const datasetPrueba= await getOrCreateDataset(session, rutaDataset);
  console.log("datasetPrueba: ", datasetPrueba);*/
}

//Si no existen en el POD crea los contenedores 
export async function createBaseContainers(session: Session) {
  const urlAlmacenamiento = await getStorageURL(session);
  console.log("Ruta base del POD: ", urlAlmacenamiento);
  const contenedorLomap: SolidDataset = await getOrCreateContainer(session, urlAlmacenamiento + RUTA_LOMAP);
  console.log("Crear en pod ruta " + RUTA_LOMAP + ". SolidDataset:", contenedorLomap);
  const contenedorLomapLocations: SolidDataset = await getOrCreateContainer(session, urlAlmacenamiento + RUTA_LOCATIONS);
  console.log("Crear en pod ruta " + RUTA_LOCATIONS + ". SolidDataset:", contenedorLomapLocations);
}

export async function getLocationJSON(session: Session, idLocation: string) {
  let jsonLocation = JSON.parse("{}");
  const location = await getLocation(session, idLocation);
  if (location !== null) {
    jsonLocation = parseLocation(session, location!);
  }
  return jsonLocation;
}

async function getUserName(session: Session) {

  if (!session || !session.info.isLoggedIn) return null;

  const profileDataset = await getSolidDataset(session.info.webId!, {
    fetch: session.fetch,
  });
  console.log("getuserName--> profileDataset", profileDataset);
  const profileThing = await getThing(profileDataset, session.info.webId!);
  console.log("getuserName--> profileThing", profileThing);
  const name = await getStringNoLocale(profileThing!, FOAF.name);
  console.log("getuserName--> name", name);
  return name
}

async function parseLocation(session: Session, location: Thing) {

  console.log("parseLocation --> location", location);
  const comments = getStringNoLocale(location, URL_VOCABULARIO + "comments");
  console.log("parseLocation --> comments", location);
  const score = getStringNoLocale(location, URL_VOCABULARIO + "score");
  console.log("parseLocation --> comments", score);
  const name = await getUserName(session);
  console.log("parseLocation --> name", name);

  let result = "";
  result += '{'
  result += '"comments": "' + comments + '",'
  result += '"score": "' + score + '",'
  result += '"name": "' + name + '"'
  result += '}'

  let parsed = JSON.parse(result);
  return parsed;
}