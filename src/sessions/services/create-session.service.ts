import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../../users/user.entity';
import authConfig from '../../config/auth.config';
import AppError from '../../shared/errors/app-error';
import IUserRepository from '../../users/repository/user-repository.interface';

interface Request {
  email: string;
  password: string;
}

interface Reponse {
  token: string;
  user: User;
}

class CreateSessionService {
  constructor(private userRepository: IUserRepository) {}

  async execute({ email, password }: Request): Promise<Reponse> {
    const user = await this.userRepository.findByEmail(email);

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
