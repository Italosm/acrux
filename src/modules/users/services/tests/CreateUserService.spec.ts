import 'reflect-metadata';
import CreateUserService from '../CreateUserService';
import FakeUsersRepository from '@modules/users/domain/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Italo',
      surname: 'Souza Melo',
      email: 'a@a.com.br',
      user_status: false,
      password: 'qaz123wsx',
    });
    expect(user).toHaveProperty('user_id');
  });

  it('should not be able to create two users with the same email', async () => {
    await createUser.execute({
      name: 'Italo',
      surname: 'Souza Melo',
      email: 'a@a.com.br',
      user_status: false,
      password: 'qaz123wsx',
    });

    expect(
      createUser.execute({
        name: 'Italo',
        surname: 'Souza Melo',
        email: 'a@a.com.br',
        user_status: false,
        password: 'qaz123wsx',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
