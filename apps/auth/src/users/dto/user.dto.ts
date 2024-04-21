export class CreateUserDto {
  email: string;
  password: string;
  username: string;
}

export class UpdateUserDto {
  id: string;
}

export class FindOneUserDto {
  id: string;
}
