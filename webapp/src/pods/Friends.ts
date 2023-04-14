import { Session } from "@inrupt/solid-client-authn-browser";
import {
  getSolidDataset,
  getSourceUrl,
  getThing,
  getUrlAll,
  getDecimal,addIri,setThing,saveSolidDatasetAt
  
} from "@inrupt/solid-client";

import { FOAF } from "@inrupt/vocab-common-rdf";


async function getFriends(session: Session) {
  // Obtener el perfil del usuario actual

  const profileDataset = await getSolidDataset(session.info.webId!, {
    fetch: session.fetch,
  });

  if (!profileDataset) {
    throw new Error("No se pudo obtener el recurso 'profile'");
  }

  // Obtener el enlace al archivo de control de acceso del perfil
  const aclUrl = getUrlAll(
    getThing(profileDataset, session.info.webId!),
    "http://www.w3.org/ns/solid/acl#control"
  )[0];

  // Obtener el archivo de control de acceso
  const aclDataset = await getSolidDataset(aclUrl, { fetch: session.fetch });

  // Obtener la lista de amigos del archivo de control de acceso
  const friendsThing = getThing(aclDataset, aclUrl + "#agentList");
  const friends = getUrlAll(friendsThing!, "http://www.w3.org/ns/solid/acl#agent").map((friendUrl) =>
    friendUrl.replace("solid://", "https://")
  );

  return friends;
}

async function getFriendData(session: Session, friendWebId: string) {
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
async function addNewFriend(webId: string, session: Session, friendWebId: string): Promise<void> {
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
async function main() {
  const session = new Session();
  //await session.login();

  const friends = await getFriends(session);

  for (const friend of friends) {
    const friendData = await getFriendData(session, friend);
    console.log(`Lugares de ${friend}:`, friendData);
  }

  await session.logout();
}

main();
