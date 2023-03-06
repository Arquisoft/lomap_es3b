import express, { Router, Request, Response, Application } from 'express';

const places:Router = express.Router();

places.get('/place/:place', (req:Request, res:Response) => {

    return res.send(req.params.place);
});

places.post('/place', (req:Request, res:Response) => {

});

export default places;