import { Router } from 'express';
import userRoutes from './users/users.routes';
import sessionRoutes from './sessions/sessions.routes';
import complaintRouter from './complaints/complaint.routes';

const router = Router();
router.get('/', (req, res) => res.json({ message: 'Hello World!' }));
router.use('/users', userRoutes);
router.use('/sessions', sessionRoutes);
router.use('/complaints', complaintRouter);

export default router;
