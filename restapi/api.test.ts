import request, {Response} from 'supertest';
import express, { Application } from 'express';
import * as http from 'http';
import bp from 'body-parser';
import cors from 'cors';
import api from './routes/api';
import { MongoClient } from 'mongodb';


let app:Application;
let server:http.Server;

beforeAll(async () => {
    app = express();
    const port: number = 5000;
    const options: cors.CorsOptions = {
        origin: ['http://localhost:3000']
    };
    app.use(cors(options));
    app.use(bp.json());
    app.use("/api", api)

    server = app.listen(port, ():void => {
        console.log('Restapi server for testing listening on '+ port);
    }).on("error",(error:Error)=>{
        console.error('Error occured: ' + error.message);
    });
});

afterAll(async () => {
    server.close() //close the server
})

describe('user ', () => {
    /**
     * Test that we can list users without any error.
     */
    it('can be listed',async () => {
        const response:Response = await request(app).get("/api/users/list");
        expect(response.statusCode).toBe(200);
    });

    /**
     * Tests that a user can be created through the productService without throwing any errors.
     */
    it('can be created correctly', async () => {
        let username:string = 'Pablo'
        let email:string = 'gonzalezgpablo@uniovi.es'
        const response:Response = await request(app).post('/api/users/add').send({name: username,email: email}).set('Accept', 'application/json')
        expect(response.statusCode).toBe(200);
    });
});

describe('POST /db/add', () => {
    let connection: MongoClient;
    let db: any;
  
    beforeAll(async () => {
      connectToDatabase();
    });
  
    afterAll(async () => {
      await connection.close();
      await db.close();
    });
  
    it('should return 200 OK and add a new place to the database', async () => {
      const place = {
        name: 'Test place',
        longitude: 10.12345,
        latitude: 50.6789,
        direction: 'Test direction',
        comments: 'Test comments',
        photoLink: ['https://example.com/image.jpg'],
        category: 'Test category',
        rating: 4.5,
      };
  
      const response = await request(app)
        .post('/db/add')
        .send(place)
        .expect(200);
  
      expect(response.status).toBe(200);
      expect(response.body).toEqual({});
  
      const places = await db.collection('places').find({ name: 'Test place' }).toArray();
      expect(places.length).toBe(1);
      expect(places[0]).toMatchObject(place);
    });
  
    it('should return 400 Bad Request if longitude or latitude are missing', async () => {
      const place = {
        name: 'Test place',
        direction: 'Test direction',
        comments: 'Test comments',
        photoLink: ['https://example.com/image.jpg'],
        category: 'Test category',
        rating: 4.5,
      };
  
      const response = await request(app)
        .post('/db/add')
        .send(place)
        .expect(400);
  
      expect(response.status).toBe(400);
    });
  });

  
describe('GET /place/:place', () => {
    it('should return the requested place', async () => {
      const place = 'New York';
      const response = await request(app).get(`/place/${place}`);
      expect(response.status).toBe(200);
      expect(response.text).toBe(place);
    });
  
    it('should return an error if no place is provided', async () => {
      const response = await request(app).get('/place/');
      expect(response.status).toBe(404);
    });
  });

  describe('GET /db/get', () => {
    it('should return an array of places', async () => {
      const response = await request(app).get('/db/get');
  
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty('name');
      expect(response.body[0]).toHaveProperty('longitude');
      expect(response.body[0]).toHaveProperty('latitude');
      expect(response.body[0]).toHaveProperty('direction');
      expect(response.body[0]).toHaveProperty('comments');
      expect(response.body[0]).toHaveProperty('photoLink');
      expect(response.body[0]).toHaveProperty('category');
      expect(response.body[0]).toHaveProperty('rating');
    });
  });