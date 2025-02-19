import { NotFoundError } from '../errors/NotFoundError';
import { ResponseData } from '../interfaces/ResponseData';
import { User } from '../models/User';
import { UserRepository } from '../repositories/UserRepository';

export class UserService {
  private userRepository = UserRepository;

  public async updateUser(
    id: number,
    updateData: Partial<User>
  ): Promise<ResponseData> {
    const result = this.userRepository.update(id, { ...updateData });

    if ((await result).affected === 0) {
      throw new NotFoundError('The user was not found');
    }

    return {
      message: 'User successfully updated!',
      data: true,
    };
  }

  public async deleteUser(id: number): Promise<ResponseData> {
    const result = this.userRepository.delete(id);
    if ((await result).affected === 0) {
      throw new NotFoundError('The user was not found');
    }

    return {
      message: 'User succesfully deleted',
      data: true,
    };
  }
}
