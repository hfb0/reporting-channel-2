import CreateUserDTO from '../dto/create-user.dto';
import User from '../user.entity';

interface IUserRepository {
  create(createUserDTO: CreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
  findByEmailOrCpf(email: string, cpf: string): Promise<User | undefined>;
}

export default IUserRepository;
