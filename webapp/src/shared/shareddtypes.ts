export type User = {
    name:string;
    email:string;
}

export type Place = {
    name:string;
    direction:string;
    latitude:number;
    longitude:number;
    comments:CommentType[];
    photoLink:string[];
    category:string;
    rating: number;
}

export type PlacePOD = {
    id: string;
    owner: string;
    place: Place;
}

export type MapType = {
    id: string;
    owner: string;
    map: PlacePOD[];
}

export type Friend = {
    name : string,
    webId : string,
}

export type CommentType = {
    id: string,
    name : string,
    webId: string,
    date : Date,
    text : string,
}

export type Imagen = {
    título: String;
    imagen: String;
    fecha: Date;
}