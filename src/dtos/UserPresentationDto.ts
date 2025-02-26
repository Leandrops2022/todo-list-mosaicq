import { Expose } from 'class-transformer';

export class UserPresentationDto {
  @Expose()
  id!: number;

  @Expose()
  name!: string;

  @Expose()
  email!: string;
}
