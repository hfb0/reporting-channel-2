import { Router } from 'express';

import CreateSessionService from './services/create-session.service';
import UserRepository from '../users/repository/user.repository';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  const userRepository = new UserRepository();
  const createSessionService = new CreateSessionService(userRepository);

  const auth = await createSessionService.execute({ email, password });

  return res.json(auth);
});

export default sessionsRouter;
