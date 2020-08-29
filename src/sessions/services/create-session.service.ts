import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../../users/user.entity';
import authConfig from '../../config/auth.config';
import AppError from '../../shared/errors/app-error';

interface Request {
  email: string;
  password: string;
}

interface Reponse {
  token: string;
  user: User;
}

class CreateSessionService {
  async execute({ email, password }: Request): Promise<Reponse> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ email });

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    delete user.password;

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      token,
      user,
    };
  }
}

export default CreateSessionService;
