import { MongoClient } from 'mongodb';
import {Place} from '../../webapp/src/shared/shareddtypes';


const mongoose = require('mongoose')
const { MONGODB, MONGODB_ATLAS_TEST, NODE_ENV } = process.env // saca del .env la ruta a la base de datos

let connectionURL: string; // coge del .env el enlace a la base de datos y lo transforma en string
connectionURL = MONGODB!; // esto falla otra vez

const client = new MongoClient("mongodb+srv://lomap:12345@lomap-es3b.fsvk8vk.mongodb.net/Lomap-es3b?retryWrites=true&w=majority"); //Para conectarse a la base

var db: any;
var cliente: any;

if (!connectionURL) { // en caso de que falle el .env
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

    console.log('Lugar guardado con exito! Nombre: ', lugar.name );

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

    console.log('Lugar borrado con exito! Nombre: ', lugarID );

    client.close();
}

export async function borrarLugar2(lugar:Place) {
    await connectToDatabase();

    const tablaDB = db.collection('places');

    await tablaDB.deleteOne(lugar);

    console.log('Lugar borrado con exito! Nombre: ', lugar.name );
    
    client.close();
}

export async function nuevoComentario(lugarID:number, comment: string) {
    await connectToDatabase();

    const tablaDB = db.collection('places');

    const addComment = { $set: { comment: comment}};

    await tablaDB.updateOne({_id:lugarID}, addComment);

    console.log('Comentario añadido con exito! ID: ', lugarID );

    client.close();
}

export async function nuevoComentario2(lugar:Place, comment: string) {
    await connectToDatabase();

    const tablaDB = db.collection('places');

    const addComment = { $set: { comment: comment}};

    await tablaDB.updateOne(lugar, addComment);

    console.log('Comentario añadido con exito! Comentario: ', lugar.comments );

    client.close();
}