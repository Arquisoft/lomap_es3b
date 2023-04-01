export type User = {
    name:string;
    email:string;
}

export type Place = {
    direction:string;
    latitude:number;
    longitude:number;
    comments:string;
    photoLink:string[];
}

export type MarkerDTO = {
    //A completar
    id:string;
    name:string;
    latitude:number;
    longitude:number;
}