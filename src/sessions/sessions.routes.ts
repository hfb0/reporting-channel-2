import { Router } from 'express';

import CreateSessionService from './services/create-session.service';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const createSessionService = new CreateSessionService();

    const auth = await createSessionService.execute({ email, password });

    return res.json(auth);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default sessionsRouter;
