import { getStringNoLocale } from "@inrupt/solid-client";
import { getUserProfile } from "./Friends";

import { FOAF } from "@inrupt/vocab-common-rdf"

export async function getProfileName(webId: string){
    let name = getStringNoLocale(
        await getUserProfile(webId),
        FOAF.name
    ) as string;

    return name;
}