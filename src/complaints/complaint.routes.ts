import { Router } from 'express';

import ensureAuth from '../shared/middlewares/ensure-auth';
import ComplaintController from './complaint.controller';

const complaintRouter = Router();
const complaintController = new ComplaintController();

complaintRouter.use(ensureAuth);

complaintRouter.post('/', complaintController.create);

export default complaintRouter;
