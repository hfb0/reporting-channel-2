import { Router } from 'express';
import CreateUserService from './services/create-user.service';

const userRouter = Router();

userRouter.post('/', async (req, res) => {
  try {
    const { name, email, cpf, password } = req.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, email, cpf, password });

    delete user.password;
    delete user.salt;

    return res.json(user);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default userRouter;
