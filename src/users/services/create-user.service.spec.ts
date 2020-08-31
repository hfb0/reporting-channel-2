import FakeUserRepository from '../repository/fakes/fake-user.repository';
import CreateUserService from './create-user.service';
import CreateUserDTO from '../dto/create-user.dto';
import AppError from '../../shared/errors/app-error';
import FakeHashProvider from '../provider/hash-provider/fakes/fake-hash.provider';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const createUserDTO = new CreateUserDTO(
      'João',
      '12345678911',
      'email@email.com',
      '123456789',
    );

    const user = await createUserService.execute(createUserDTO);

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const createUserDTO1 = new CreateUserDTO(
      'João',
      '12345678911',
      'email@email.com',
      '123456789',
    );

    const createUserDTO2 = new CreateUserDTO(
      'João',
      '12345678912',
      'email@email.com',
      '123456789',
    );

    await createUserService.execute(createUserDTO1);

    expect(createUserService.execute(createUserDTO2)).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should not be able to create a new user with same CPF from another', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const createUserDTO1 = new CreateUserDTO(
      'João',
      '12345678911',
      'joao@email.com',
      '123456789',
    );

    const createUserDTO2 = new CreateUserDTO(
      'João',
      '12345678911',
      'email@email.com',
      '123456789',
    );

    await createUserService.execute(createUserDTO1);

    expect(createUserService.execute(createUserDTO2)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
