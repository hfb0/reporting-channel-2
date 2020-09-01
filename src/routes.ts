import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import userRoutes from './users/users.routes';
import sessionRoutes from './sessions/sessions.routes';
import complaintRouter from './complaints/complaint.routes';
import swaggerDoc from './docs/swagger';

const router = Router();
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
router.use('/users', userRoutes);
router.use('/sessions', sessionRoutes);
router.use('/complaints', complaintRouter);

export default router;
