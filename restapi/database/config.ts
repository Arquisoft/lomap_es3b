import { MongoClient } from 'mongodb';
import { Place } from '../../webapp/src/shared/shareddtypes';

const mongoose = require('mongoose')

const clave:string = process.env.MONGODB ?? "mongodb+srv://lomap:12345@lomap-es3b.fsvk8vk.mongodb.net/Lomap-es3b?retryWrites=true&w=majority";

const client = new MongoClient(clave);

var db: any;

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

export async function guardarLugar(lugar:string) {
    await connectToDatabase();

    let place:Place = JSON.parse(lugar);

    const tablaDB = db.collection('places');

    await tablaDB.insertOne(place);

    console.log('Lugar guardado con exito! Nombre: ', place.name);

    client.close();
}

export async function buscarLugar(lugarID: number) {
    await connectToDatabase();

    const tablaDB = db.collection('places');

    const lugar = await tablaDB.findOne({ _id: lugarID });

    client.close();

    return lugar;
}

export async function buscarLugaresPorNombre(lugarName: string):Promise<Place[]> {
    await connectToDatabase();

    const tablaDB = db.collection('places');

    const lugares = await tablaDB.find({ name: lugarName}).toArray();

    client.close();

    return lugares;
}

export async function cogerLugares(): Promise<Place[]> {
    await connectToDatabase();

    const tablaDB = db.collection('places');

    const lugares = await tablaDB.find().toArray();

    client.close();

    return lugares;
}

export async function borrarLugar(lugarID: number) {
    await connectToDatabase();

    const tablaDB = db.collection('places');

    const filtro = { id: lugarID };

    await tablaDB.deleteOne(filtro);

    console.log('Lugar borrado con exito! ID: ', lugarID);

    client.close();
}


export async function borrarLugaresPorNombre (lugarName: string){
    await connectToDatabase();

    const tablaDB = db.collection('places');

    const filtro = { name : lugarName };

    await tablaDB.deleteMany(filtro);

    console.log('Lugares borrado con exito! Nombre: ', lugarName);

    client.close();
}

export async function borrarLugar2(lugar: Place) {
    await connectToDatabase();

    const tablaDB = db.collection('places');

    await tablaDB.deleteOne(lugar);

    console.log('Lugar borrado con exito! Nombre: ', lugar.name);

    client.close();
}

export async function nuevoComentario(lugarID: number, comment: string) {
    await connectToDatabase();

    const tablaDB = db.collection('places');

    const addComment = { $set: { comment: comment } };

    await tablaDB.updateOne({ _id: lugarID }, addComment);

    console.log('Comentario añadido con exito! ID: ', lugarID);

    client.close();
}

export async function nuevoComentario2(lugar: Place, comment: string) {
    await connectToDatabase();

    const tablaDB = db.collection('places');

    const addComment = { $set: { comment: comment } };

    await tablaDB.updateOne(lugar, addComment);

    console.log('Comentario añadido con exito! Comentario: ', lugar.comments);

    client.close();
}