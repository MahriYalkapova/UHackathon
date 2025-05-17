import express, { NextFunction, Request, Respones, Router } from 'express';

const userRouter: Router = express.Router();

//Basic Adding an Item (No Error Catching)
userRouter.post('/', async (request: Request, response: Response) => {
    const addQuery = `INSERT INTO ITEMS(userID, firstN, lastN, email. phoneNum) VALUES ($1, $2, $3, $4, $5)`;
    const values = [
        request.body.userID,
        request.body.firstN,
        request.body.lastN,
        request.body.email,
        request.body.phoneNum
    ];
});