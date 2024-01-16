import express from 'express';
import * as AuthController from '../controllers/authController'

const authRouter = express.Router();

// Route definitions
authRouter.post("/login", AuthController.postLogin);
authRouter.post('/register', AuthController.postRegister);

export default authRouter;