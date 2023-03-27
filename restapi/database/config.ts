import { MongoClient } from 'mongodb';
import {Place} from '../api';


const mongoose = require('mongoose')
const { MONGODB, MONGODB_ATLAS_TEST, NODE_ENV } = process.env // saca del .env la ruta a la base de datos
const connectionString = MONGODB // el enlace a la base de datos

const uri = 'mongodb://localhost:27017/Lomap-es3b';
const client = new MongoClient(uri);

var db: any;
var cliente: any;

if (!connectionString) {
    console.error('Yoy must define your connection string')
}

// Realiza la conexion con la base de datos
/** 
const dbConnection = async () => {
    try {
        mongoose.set("strictQuery", false)
        await mongoose.connect(connectionString), { // se conecta con el mongoose
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }
        // en caso de conectar correctamente con la base de datos
        console.log('Database online succesfully')
    } catch (err) {
        console.log(err)
        throw new Error('Cannot connect to the database ')
    }

    process.on('uncaughtException', error => {
        console.error(error)
        mongoose.disconnect()
    })
}
module.exports = { dbConnection } */


export async function connectToDatabase() {
    try {
      await client.connect();
      console.log('Connected to database!');
      db = client.db();

    } catch (error) {
      console.error(error);
      throw new Error('Failed to connect to database');
    }
  }

export async function guardarLugar(lugar:Place) {
    await connectToDatabase();

    const tablaDB = db.collection('places');

    await tablaDB.insertOne(lugar);

    client.close();
}

export async function cogerLugar(lugarID:number) {
    await connectToDatabase();

    const tablaDB = db.collection('places');

    const lugar = await tablaDB.findOne({_id:lugarID});

    client.close();

    return lugar;
}

export async function borrarLugar(lugarID:number) {
    await connectToDatabase();

    const tablaDB = db.collection('places');

    const filtro = {id:lugarID};

    await tablaDB.deleteOne(filtro);
    
    client.close();
}

export async function nuevoComentario(lugarID:number, comment: string) {
    await connectToDatabase();

    const tablaDB = db.collection('places');

    const addComment = { $set: { comment: comment}};

    await tablaDB.updateOne({_id:lugarID}, addComment);

    client.close();
}

export async function addPlace(name: string, latitude: number, longitude: number, direction: string): Promise<string> {
  const result = await db.collection('places').insertOne({
    name, latitude, longitude, direction
    ,
  });
  console.log(`Inserted place with ID ${result.insertedId}`);
  return result.insertedId.toHexString();
}
