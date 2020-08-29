import { Router } from 'express';
import CreateUserService from './services/create-user.service';

const userRouter = Router();

userRouter.post('/', async (req, res) => {
  const { name, email, cpf, password } = req.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({ name, email, cpf, password });

  delete user.password;

  return res.json(user);
});

export default userRouter;
