import express, { Request, Response, Router } from 'express';
import {check} from 'express-validator';

const Place= require("./models/place")

const api:Router = express.Router()
interface User {
    name: string;
    email: string;
}

//This is not a restapi as it mantains state but it is here for
//simplicity. A database should be used instead.
let users: Array<User> = [];

api.get(
    "/users/list",
    async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).send(users);
    }
);

// Prueba de base de datos
api.get(
  "/prueba",
  function(req: Request, res: Response): void {
    var place = {
      name : "Oviedo", direction : "Calle Uria", longitude : 33.3 , latitude: 33.33, comments:"Muy bueno", photoLink : {photo1: "https://ingenieriainformatica.uniovi.es/image/image_gallery?uuid=52c688ab-7f0c-424a-9113-60d512f0ca8b&groupId=780436&t=1347274143849" , photo2: "Hola"}
    }
    Place.collection.insertOne(place);
    console.log(place)
    res.sendStatus(200);
  }
)

api.post(
  "/users/add",[
    check('name').isLength({ min: 1 }).trim().escape(),
    check('email').isEmail().normalizeEmail(),
  ],
  async (req: Request, res: Response): Promise<Response> => {
    let name = req.body.name;
    let email = req.body.email;
    let user: User = {name:name,email:email}
    users.push(user);
    return res.sendStatus(200);
  }
);

export default api;