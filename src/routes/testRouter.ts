import express from 'express';
import * as TestController from '../controllers/testController'

const testRouter = express.Router();

// Route definitions
testRouter.get("/", TestController.testApi);

export default testRouter;