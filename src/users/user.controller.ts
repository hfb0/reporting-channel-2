import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import CreateUserService from './services/create-user.service';
import CreateUserDTO from './dto/create-user.dto';

export default class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    const createUserDTO = new CreateUserDTO(
      req.body.name,
      req.body.cpf,
      req.body.email,
      req.body.password,
    );

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute(createUserDTO);

    return res.json(classToClass(user));
  }
}
