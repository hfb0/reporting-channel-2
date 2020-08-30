import { Router } from 'express';
import { container } from 'tsyringe';

import CreateUserService from './services/create-user.service';
import CreateUserDTO from './dto/create-user.dto';

const userRouter = Router();

userRouter.post('/', async (req, res) => {
  const createUserDTO = new CreateUserDTO(
    req.body.name,
    req.body.cpf,
    req.body.email,
    req.body.password,
  );

  const createUser = container.resolve(CreateUserService);

  const user = await createUser.execute(createUserDTO);

  delete user.password;

  return res.json(user);
});

export default userRouter;
