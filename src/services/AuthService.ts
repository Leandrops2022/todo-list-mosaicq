import InvalidCredentialsError from '../errors/InvalidCredentialsError';
import { ResponseData } from '../interfaces/ResponseData';
import { User } from '../models/User';
import { UserRepository } from '../repositories/UserRepository';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import getEnvVariables from '../utils/getEnvVariables';

const secret = getEnvVariables().JWT_SECRET;

export class AuthService {
  private repository = UserRepository;

  public async createUser(user: User): Promise<ResponseData> {
    const saltRounds = 10;
    user.password = await hash(user.password, saltRounds);
    const createdUser = await this.repository.save(user);
    const token = this.createToken(createdUser);

    return {
      message: 'User created successfully!',
      data: createdUser,
      token: token,
    };
  }

  public async login(email: string, password: string): Promise<ResponseData> {
    const user = await this.repository.findOne({ where: { email } });

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new InvalidCredentialsError();
    }

    const token = this.createToken(user);

    return {
      message: 'Logado com sucesso!',
      data: user,
      token: token,
    };
  }

  private createToken = (user: User) => {
    return sign({ id: user.id, email: user.email }, secret, {
      expiresIn: '8h',
    });
  };
}
