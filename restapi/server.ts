import express, { Application, RequestHandler } from "express";
import cors from 'cors';
import bp from 'body-parser';
import promBundle from 'express-prom-bundle';
import api from "./routes/api";

import https from "https";
import fs from "fs";

require ('dotenv').config();

const app: Application = express();
const port: number = 5000;

const options = {
    key: fs.readFileSync('./certificate/private-key.pkey'),
    cert: fs.readFileSync('./certificate/certificate.cert')
}

const metricsMiddleware:RequestHandler = promBundle({includeMethod: true});
app.use(metricsMiddleware);

app.use(cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
    }
));
app.use(bp.json());

app.use("/api", api)

https.createServer(options, app).listen(port, ():void => {
    console.log('(HTTPS) Restapi listening on '+ port);
}).on("error",(error:Error)=>{
    console.error('Error occured: ' + error.message);
});