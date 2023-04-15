import { Session } from "@inrupt/solid-client-authn-browser";
import {
  getSolidDataset,
  getSourceUrl,
  getThing,
  getUrlAll,
  getDecimal,addIri,setThing,saveSolidDatasetAt
  
} from "@inrupt/solid-client";
import { FOAF } from "@inrupt/vocab-common-rdf";


/**
 * Devuelve un listado de amigos a partir de la session que esta iniciada
 */
export async function getFriends(session: Session): Promise<string[]> {
  try {
    // Obtener el perfil del usuario actual
    const profileDataset = await getSolidDataset(session.info.webId!, {
      fetch: session.fetch,
    });

    if (!profileDataset) {
      throw new Error("No se pudo obtener el recurso 'profile'");
    }

    const profileThing = getThing(profileDataset, session.info.webId!);

    if (!profileThing) {
      throw new Error("No se encontró el perfil de usuario en el recurso 'profile'");
    }

    const listFriends = getUrlAll(profileThing, FOAF.knows);

    return listFriends;
  } catch (error) {
    console.error("Ocurrió un error al obtener la lista de amigos:", error);
    throw error;
  }
}

export async function getFriendData(session: Session, friendWebId: string) {
  // Obtener el dataset del perfil del amigo
  const friendDataset = await getSolidDataset(friendWebId, { fetch: session.fetch });

  // Obtener la ubicación del archivo de datos de los lugares del amigo
  const friendProfile = getThing(friendDataset, friendWebId);
  const friendPlacesUrl = getUrlAll(friendProfile!, "https://schema.org/dataFeed")[0];

  // Obtener el dataset de los lugares del amigo
  const friendPlacesDataset = await getSolidDataset(friendPlacesUrl, { fetch: session.fetch });

  // Obtener los lugares del amigo
  const friendPlaces = getThing(friendPlacesDataset, friendPlacesUrl);
  const places = getUrlAll(friendPlaces!, "https://schema.org/itemListElement").map((placeUrl) => {
    const place = getThing(friendPlacesDataset, placeUrl);
    return {
      name: place?.getString("https://schema.org/name")!,
      description: place?.getString("https://schema.org/description") || "",
      latitude: getDecimal(place?.getLiteral("https://schema.org/latitude")),
      longitude: getDecimal(place?.getLiteral("https://schema.org/longitude")),
    };
  });

  return places;
}

//Function that adds a new friend to the user's profile
export async function addNewFriend(webId: string, session: Session, friendWebId: string): Promise<void> {
    // Obtener el conjunto de datos Solid del perfil
    const profileDataset = await getSolidDataset(webId);

    const thing = getThing(profileDataset, webId);

    const updatedThing = addIri(thing!, FOAF.knows, friendWebId);

    const updatedProfileDataset = setThing(profileDataset, updatedThing);

    await saveSolidDatasetAt(webId, updatedProfileDataset, {
        fetch: session.fetch,
    });
}

// Ejemplo de uso: NONONOONONONNONONONONO
async function ejemploDeUso() {
  const session = new Session();
  //await session.login();

  const friends = await getFriends(session);

  for (const friend of friends) {
    const friendData = await getFriendData(session, friend);
    console.log(`Lugares de ${friend}:`, friendData);
  }

  await session.logout();
}

export default {getFriends, addNewFriend, getFriendData};
