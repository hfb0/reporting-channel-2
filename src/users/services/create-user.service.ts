import { injectable, inject } from 'tsyringe';

import User from '../user.entity';
import AppError from '../../shared/errors/app-error';
import IUserRepository from '../repository/user-repository.interface';
import CreateUserDTO from '../dto/create-user.dto';
import IHashProvider from '../provider/hash-provider/hash-provider.interface';

interface Request {
  name: string;
  cpf: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute(createUserDTO: CreateUserDTO): Promise<User> {
    const checkUserExists = await this.userRepository.findByEmailOrCpf(
      createUserDTO.email,
      createUserDTO.cpf,
    );

    if (checkUserExists) {
      throw new AppError('User already exists!', 400);
    }

    createUserDTO.setPasswordHashed(
      await this.hashProvider.generateHash(createUserDTO.password),
    );

    const user = this.userRepository.create(createUserDTO);

    return user;
  }
}

export default CreateUserService;
