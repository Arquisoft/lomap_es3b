// Importamos las dependencias necesarias
const { MongoClient } = require('mongodb');
const { guardarLugar, connectToDatabase, borrarLugar2 } = require('../database/config'); // Es necesario importar la función que queremos probar
const {Place} = require('../../webapp/src/shared/shareddtypes')

const client = new MongoClient("mongodb+srv://lomap:12345@lomap-es3b.fsvk8vk.mongodb.net/Lomap-es3b?retryWrites=true&w=majority"); //Para conectarse a la base

var db: any;

// Antes de los tests, nos conectamos a la base de datos
beforeAll(async () => {
  connectToDatabase();
});



// Creamos los test unitarios
describe('guardarLugar', () => {
  test('Debe guardar un lugar en la base de datos', async () => {
    // Creamos un objeto Place de ejemplo
    const lugar = {
        name: "TESTESTESTES",
        direction: "",
        latitude: 0.0,
        longitude: 0.0,
        comments: "",
        photoLink: [],
        category: "",
        rating: 0.0
    }

    // Llamamos a la función guardarLugar con el objeto Place creado
    await guardarLugar(lugar);

    // Buscamos el lugar guardado en la base de datos y comprobamos que existe

    const tablaDB = db('testdb').collection('places');
    const lugarGuardado = await tablaDB.findOne({ name: lugar.name });
    expect(lugarGuardado).toBeTruthy();

    // Borramos el lugar guardado para dejar la base de datos como estaba antes de los tests
    await tablaDB.deleteOne({ name: lugar.name });
  });
  
  test('Debe lanzar un error si no se puede conectar a la base de datos', async () => {
    // Desconectamos la base de datos para simular un error en la conexión
    await client.close();

    // Creamos un objeto Place de ejemplo
    const lugar = { name: 'Ejemplo', address: 'Calle Ejemplo 123', category: 'Ejemplo' };

    // Llamamos a la función guardarLugar con el objeto Place creado
    await expect(guardarLugar(lugar)).rejects.toThrow('failed to connect to server');

  });
});

describe('borrarLugar', () => {

    beforeAll(async () => {
        connectToDatabase();
    });
  
    it('should delete a place from the database', async () => {
      // Insert a test place into the database
      const testPlace = {
        name: 'Test Place',
        direction: '',
        latitude: 0.0,
        longitude: 0.0,
        comments: '',
        photoLink: [],
        category: '',
        rating: 0.0,
      };
      await db.collection('places').insertOne(testPlace);
  
      // Call the function to delete the test place
      await borrarLugar2(testPlace.name);
  
      // Check that the test place was deleted from the database
      const result = await db.collection('places').findOne({ name: testPlace.name });
      expect(result).toBeNull();
    });
  });
