import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import User from '../../users/user.entity';
import authConfig from '../../config/auth.config';
import AppError from '../../shared/errors/app-error';
import IUserRepository from '../../users/repository/user-repository.interface';
import IHashProvider from '../../users/provider/hash-provider/hash-provider.interface';

interface Request {
  email: string;
  password: string;
}

interface Reponse {
  token: string;
  user: User;
}

@injectable()
class CreateSessionService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({ email, password }: Request): Promise<Reponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

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
