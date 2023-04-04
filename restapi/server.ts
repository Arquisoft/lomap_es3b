import express, { Application, RequestHandler } from "express";
import cors from 'cors';
import bp from 'body-parser';
import promBundle from 'express-prom-bundle';
import api from "./routes/api"; 
import {Place} from '../webapp/src/shared/shareddtypes';
import { guardarLugar, connectToDatabase, borrarLugar, borrarLugar2, nuevoComentario2 } from "./database/config";


require ('dotenv').config();

const app: Application = express();
const port: number = 5000;

//const {connectToDatabase} = require("./database/config.ts")

const metricsMiddleware:RequestHandler = promBundle({includeMethod: true});
app.use(metricsMiddleware);

app.use(cors());
app.use(bp.json());

app.use("/api", api)


app.listen(port, ():void => {
    console.log('Restapi listening on '+ port);
}).on("error",(error:Error)=>{
    console.error('Error occured: ' + error.message);
});

 
const lugarPrueba: Place = {
    name:"Prueba con categoria 2",
    direction:"Antuna Branka Simica 18",
    latitude: 43.50642,
    longitude: 16.45876,
    comments:"Buen sitio para vivir",
    photoLink:[],
    category:"Monumento"
}
//connectToDatabase();
// guardarLugar(lugarPrueba);
//nuevoComentario2(lugarPrueba, "Un sitio genial");
