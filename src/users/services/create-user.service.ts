import { hash, genSalt } from 'bcryptjs';

import User from '../user.entity';
import AppError from '../../shared/errors/app-error';
import IUserRepository from '../repository/user-repository.interface';
import CreateUserDTO from '../dto/create-user.dto';

interface Request {
  name: string;
  cpf: string;
  email: string;
  password: string;
}

class CreateUserService {
  constructor(private userRepository: IUserRepository) {}

  public async execute(createUserDTO: CreateUserDTO): Promise<User> {
    const checkUserExists = await this.userRepository.findByEmailOrCpf(
      createUserDTO.email,
      createUserDTO.cpf,
    );

    if (checkUserExists) {
      throw new AppError('User already exists!', 400);
    }

    const salt = await genSalt(10);
    createUserDTO.setPasswordHashed(await hash(createUserDTO.password, salt));

    const user = this.userRepository.create(createUserDTO);

    return user;
  }
}

export default CreateUserService;
