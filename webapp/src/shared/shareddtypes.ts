export type User = {
    name:string;
    email:string;
}

export type Place = {
    name:string;
    direction:string;
    latitude:number;
    longitude:number;
    comments:string;
    photoLink:string[];
    category:string;
    rating: number;
}

export type PlacePOD = {
    id: string;
    place: Place;
}

export type MapType = {
    id: string;
    map: PlacePOD[];
}

export type Friend = {
    name : string,
    webId : string,
}

export type Location = {
    id?: string;
    name: string,
    category: string,
    comments?: string,
    latitud?: number,
    longitud?: number,
    score?: number
}
