import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateSessionService from './services/create-session.service';

export default class SessionController {
  async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const createSessionService = container.resolve(CreateSessionService);

    const auth = await createSessionService.execute({ email, password });

    delete auth.user.password;

    return res.json(auth);
  }
}
