import express,{Application} from 'express';
import https from "https";
import fs from "fs";
//for using an import here we need to configure the tsconfig.json
//setting the option module to commonjs

require ('dotenv').config();

var app: Application = express()
const port: number = 3000;

app.use(express.static('build'))

const options = {
    key: fs.readFileSync('./certificate/private-key.pkey'),
    cert: fs.readFileSync('./certificate/certificate.cert')
}

https.createServer(options,app).listen(port,():void=>{
    console.log('(HTTPS) Webapp started on port '+ port);
}).on("error",(error:Error)=>{
    console.error('Error occured: ' + error.message);
});