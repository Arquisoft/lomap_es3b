import express, { Request, Response, Router } from 'express';
import {check} from 'express-validator';
require ('dotenv').config();

const {dbConnection} = require("./database/config.ts")
const Place= require("./models/place")

const api:Router = express.Router()
dbConnection()

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

api.get(
  "/prueba",
  function(req: Request, res: Response): void {
    var place = {
      name : "Oviedo", direction : "Calle Uria", coord : "23"
    }
    Place.collection.insertOne(place);
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