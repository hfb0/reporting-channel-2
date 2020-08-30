import { Repository, getRepository } from 'typeorm';
import IUserRepository from './user-repository.interface';
import User from '../user.entity';
import CreateUserDTO from '../dto/create-user.dto';

class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  async create(createUserDTO: CreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(createUserDTO);

    await this.ormRepository.save(user);

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ email });

    return user;
  }

  async findByEmailOrCpf(
    email: string,
    cpf: string,
  ): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: [{ email }, { cpf }],
    });

    return user;
  }
}

export default UserRepository;
