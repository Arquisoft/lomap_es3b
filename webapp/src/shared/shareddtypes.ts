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
}

export type MarkerDTO = {
    id:string;
    name:string;
    latitude:number;
    longitude:number;
    category:string;
}