import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IUpdateUser } from '../domain/models/IUpdateUser';
import { IUser } from '../domain/models/IUser';
import { compare, hash } from 'bcryptjs';

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    name,
    surname,
    email,
    password,
    old_password,
  }: IUpdateUser): Promise<IUser> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }
    if (email) {
      const userUpdateEmail = await this.usersRepository.findByEmail(email);
      if (userUpdateEmail && userUpdateEmail.user_id !== user_id) {
        throw new AppError('There is already one user with this email.');
      }
      user.email = email;
    }

    if (password && !old_password) {
      throw new AppError('Old password is required.');
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError('Old password does not match.');
      }

      user.password = await hash(password, 8);
    }

    user.name = name;
    user.surname = surname;
    await this.usersRepository.save(user);
    return user;
  }
}

export default UpdateProfileService;
