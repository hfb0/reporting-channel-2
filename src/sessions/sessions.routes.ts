import { Router } from 'express';

import CreateSessionService from './services/create-session.service';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  const createSessionService = new CreateSessionService();

  const auth = await createSessionService.execute({ email, password });

  return res.json(auth);
});

export default sessionsRouter;
