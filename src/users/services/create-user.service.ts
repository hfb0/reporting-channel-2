import { getRepository } from 'typeorm';
import { hash, genSalt } from 'bcryptjs';

import User from '../user.entity';

interface Request {
  name: string;
  cpf: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, cpf, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: [{ email }, { cpf }],
    });

    if (checkUserExists) {
      throw new Error('User already exists!');
    }
    const salt = await genSalt(10);
    const passwordHashed = await hash(password, salt);

    const user = usersRepository.create({
      name,
      cpf,
      email,
      password: passwordHashed,
      salt,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
