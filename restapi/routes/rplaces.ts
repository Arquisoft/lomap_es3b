import express, { Router, Request, Response, Application } from 'express';

const places:Router = express.Router();

const Place = require('../models/place')

places.get('/place/:place', (req:Request, res:Response) => {

    return res.send(req.params.place);
});

places.get('/places/list', async (req:Request, res:Response):Promise<Response> => {
    var place = await Place.findOne({});
    console.log(places);
    return res.status(200).send(place);
});

export default places;