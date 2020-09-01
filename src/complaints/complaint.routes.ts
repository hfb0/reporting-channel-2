import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuth from '../shared/middlewares/ensure-auth';
import ComplaintController from './complaint.controller';

const complaintRouter = Router();
const complaintController = new ComplaintController();

complaintRouter.use(ensureAuth);

complaintRouter.get('/', complaintController.index);

complaintRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      description: Joi.string().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
    },
  }),
  complaintController.create,
);

export default complaintRouter;
