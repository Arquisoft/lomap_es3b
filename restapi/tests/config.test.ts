import { borrarLugaresPorNombre, buscarLugaresPorNombre } from "../database/config";

// Importamos las dependencias necesarias
const { MongoClient } = require('mongodb');
import { guardarLugar, borrarLugar2 } from '../database/config'; // Es necesario importar la función que queremos probar

// Creamos los test unitarios
describe('guardarLugar', () => {
  test('Debe guardar un lugar en la base de datos', async () => {
    // Creamos un objeto Place de ejemplo
    const lugar = {
        name: "TESTESTESTES",
        direction: "",
        latitude: 0.0,
        longitude: 0.0,
        comments: [],
        photoLink: [],
        category: "",
        rating: 0.0
    }

    // Llamamos a la función guardarLugar con el objeto Place creado
    await guardarLugar(JSON.stringify(lugar));

    // Buscamos el lugar guardado en la base de datos y comprobamos que existe

    var lugarGuardado = await buscarLugaresPorNombre(lugar.name);
    expect(lugarGuardado).toBeTruthy();
    expect(lugarGuardado.length).toBeGreaterThanOrEqual(1);
  });
});

describe('borrarLugar', () => {
  
    it('should delete a place from the database', async () => {
      // Insert a test place into the database
      const testPlace = {
        name: 'Test Place',
        direction: '',
        latitude: 0.0,
        longitude: 0.0,
        comments: [],
        photoLink: [],
        category: '',
        rating: 0.0,
      };
      
      await guardarLugar(JSON.stringify(testPlace));
  
      // Call the function to delete the test place
      await borrarLugar2(testPlace);
  
      // Check that the test place was deleted from the database
      
      var lugarGuardado = await buscarLugaresPorNombre(testPlace.name);
      expect(lugarGuardado).toBeTruthy();
      expect(lugarGuardado.length).toBe(0);
    });
  });

  afterAll(async () => {
    await borrarLugaresPorNombre("TESTESTESTES");
    await borrarLugaresPorNombre('Test Place');
  })
