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
}

export interface PlaceInter {
    name: String;
    longitude: number;
    latitude: number;
    direction: String;
    comments: String;
    photoLink: String;
  }