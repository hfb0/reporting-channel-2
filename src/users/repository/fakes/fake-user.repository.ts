import { uuid } from 'uuidv4';
import IUserRepository from '../user-repository.interface';
import User from '../../user.entity';
import CreateUserDTO from '../../dto/create-user.dto';

class FakeUserRepository implements IUserRepository {
  private users: User[] = [];

  async create(createUserDTO: CreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, createUserDTO);

    this.users.push(user);

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);

    return findUser;
  }

  async findByEmailOrCpf(
    email: string,
    cpf: string,
  ): Promise<User | undefined> {
    const findUser = this.users.find(
      user => user.email === email || user.cpf === cpf,
    );

    return findUser;
  }
}

export default FakeUserRepository;
