import { Router } from 'express';
import UserController from './user.controller';

const userRouter = Router();
const userController = new UserController();

userRouter.post('/', userController.create);

export default userRouter;
