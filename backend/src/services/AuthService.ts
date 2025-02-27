import UnauthorizedError from '../errors/UnauthorizedError';
import { User } from '../models/User';
import { UserRepository } from '../repositories/UserRepository';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import getEnvVariables from '../utils/getEnvVariables';
import { CreateUserDto } from '../dtos/CreateUserDto';
import { LoginDto } from '../dtos/LoginDto';
import { plainToInstance } from 'class-transformer';
import { UserPresentationDto } from '../dtos/UserPresentationDto';

const secret = getEnvVariables().JWT_SECRET;

export class AuthService {
  private repository = UserRepository;

  public async createUser(dto: CreateUserDto) {
    const saltRounds = 10;
    dto.password = await hash(dto.password, saltRounds);
    const createdUser = await this.repository.save(dto);
    const token = this.createToken(createdUser);

    const userPresentationDto = plainToInstance(
      UserPresentationDto,
      createdUser,
      { excludeExtraneousValues: true }
    );

    return {
      message: 'Usuário criado com sucesso!',
      data: userPresentationDto,
      token: token,
    };
  }

  public async login(dto: LoginDto) {
    const user = await this.repository.findOne({
      select: { name: true, email: true, id: true, password: true },
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedError();
    }

    const isPasswordValid = await compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError();
    }

    const token = this.createToken(user);
    const presentationDto = plainToInstance(UserPresentationDto, user, {
      excludeExtraneousValues: true,
    });

    return {
      message: 'Logado com sucesso!',
      data: presentationDto,
      token: token,
    };
  }

  private createToken = (user: User) => {
    return sign({ id: user.id, email: user.email, name: user.name }, secret, {
      expiresIn: '8h',
    });
  };
}
