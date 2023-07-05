import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';
import { ICreateSession } from '../domain/models/ICreateSession';
import authConfig from '@config/auth';
import { Secret, sign } from 'jsonwebtoken';
import { ISession } from '../domain/models/ISession';

@injectable()
class CreateSessionsService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}
  public async execute({ email, password }: ICreateSession): Promise<ISession> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Invalid credentials.', 401);
    }
    if (!user.user_id) {
      throw new AppError('Invalid credentials.', 401);
    }

    if (!user.user_status) {
      throw new AppError('Unauthorized.', 401);
    }

    const passwordMatch = await this.hashProvider.compareHash(
      password,
      user.password,
    );
    if (!passwordMatch) {
      throw new AppError('Invalid credentials.', 401);
    }
    const token = sign({}, authConfig.jwt.secret as Secret, {
      subject: user.user_id.toString(),
      expiresIn: authConfig.jwt.expiresIn,
    });
    return { user, token };
  }
}

export default CreateSessionsService;
