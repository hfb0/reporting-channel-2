import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import UserController from './user.controller';

const userRouter = Router();
const userController = new UserController();

userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      cpf: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    },
  }),
  userController.create,
);

export default userRouter;
