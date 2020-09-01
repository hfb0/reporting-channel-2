import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import SessionController from './session.controller';

const sessionsRouter = Router();
const sessionController = new SessionController();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionController.create,
);

export default sessionsRouter;
