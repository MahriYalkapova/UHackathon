import express, { NextFunction, Request, Respones, Router } from 'express';

const itemRouter: Router = express.Router();

//Basic Adding an Item (No Error Catching)
itemRouter.post('/', async (request: Request, response: Response) => {
    const addQuery = `INSERT INTO ITEMS(itemID, name, image_url) VALUES ($1, $2, $3)`;
    const values = [
        request.body.itemID,
        request.body.name,
        request.body.image_url
    ];
});