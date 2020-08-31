import FakeUserRepository from '../../users/repository/fakes/fake-user.repository';
import CreateSessionService from './create-session.service';
import CreateUserService from '../../users/services/create-user.service';
import CreateUserDTO from '../../users/dto/create-user.dto';
import FakeHashProvider from '../../users/provider/hash-provider/fakes/fake-hash.provider';
import AppError from '../../shared/errors/app-error';

describe('CreateSession', () => {
  it('should be able to authenticate', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createSessionService = new CreateSessionService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const userCreated = await createUserService.execute(
      new CreateUserDTO('João', '12345678911', 'email@email.com', '123456789'),
    );

    const createSessionDTO = {
      email: 'email@email.com',
      password: '123456789',
    };

    const session = await createSessionService.execute(createSessionDTO);

    expect(session).toHaveProperty('token');
    expect(session.user).toEqual(userCreated);
  });

  it('should not be able to authenticate with non existing user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createSessionService = new CreateSessionService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const createSessionDTO = {
      email: 'email@email.com',
      password: '123456789',
    };

    expect(
      createSessionService.execute(createSessionDTO),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createSessionService = new CreateSessionService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    await createUserService.execute(
      new CreateUserDTO('João', '12345678911', 'email@email.com', '123456789'),
    );

    const createSessionDTO = {
      email: 'email@email.com',
      password: '12345678',
    };

    expect(
      createSessionService.execute(createSessionDTO),
    ).rejects.toBeInstanceOf(AppError);
  });
});
