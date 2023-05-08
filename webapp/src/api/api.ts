import {User,Place} from '../shared/shareddtypes';

const apiEndPoint= process.env.REACT_APP_API_URI || 'https://localhost:5000/api'

export async function addUser(user:User):Promise<boolean>{
    let response = await fetch(apiEndPoint+'/users/add', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({'name':user.name, 'email':user.email})
      });
    if (response.status===200)
      return true;
    else
      return false;
}

export async function getUsers():Promise<User[]>{
    let response = await fetch(apiEndPoint+'/users/list');
    //The objects returned by the api are directly convertible to User objects
    return response.json()
}

export async function getPlaces():Promise<Place[]>{
    let response = await fetch(apiEndPoint+'/db/get');
    return response.json()
}

/**
 * Añade a la base de datos el Place pasado
 * Usando la direccion http://localhost:5000/api/db/add
 * Lo pasa a Json y lo manda
 */
export async function addMarker(marker:Place):Promise<boolean>{
  console.log("Preparado para guardar lugar en api.ts de webapp");

  console.log(apiEndPoint+"/db/add");


  console.log(marker);

  let response = await fetch(apiEndPoint+'/db/add', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        'name':marker.name, 
        'direction':marker.direction,
        'latitude':marker.latitude, 
        'longitude':marker.longitude, 
        'comments':marker.comments,
        'photoLink':marker.photoLink, 
        'category':marker.category, 
        'rating':marker.rating})
    });

  if (response.status===200)
    return true;
  else
    console.log(response);
    return false;
}