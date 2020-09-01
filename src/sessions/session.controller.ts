import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import CreateSessionService from './services/create-session.service';

export default class SessionController {
  async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const createSessionService = container.resolve(CreateSessionService);

    const auth = await createSessionService.execute({ email, password });

    auth.user = classToClass(auth.user);

    return res.json(auth);
  }
}
