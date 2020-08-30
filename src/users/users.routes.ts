import { Router } from 'express';
import CreateUserService from './services/create-user.service';
import UserRepository from './repository/user.repository';
import CreateUserDTO from './dto/create-user.dto';

const userRouter = Router();

userRouter.post('/', async (req, res) => {
  const createUserDTO = new CreateUserDTO(
    req.body.name,
    req.body.cpf,
    req.body.email,
    req.body.password,
  );

  const userRepository = new UserRepository();
  const createUser = new CreateUserService(userRepository);

  const user = await createUser.execute(createUserDTO);

  delete user.password;

  return res.json(user);
});

export default userRouter;
