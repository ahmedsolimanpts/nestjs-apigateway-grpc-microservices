import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  CreateUserDto,
  UpdateOneUserDto,
  USERS_SERIVCE_SERVICE_NAME,
  UsersSerivceClient,
} from '@app/common';
import { AUTH_SERVICE } from './constants';
import { ClientGrpc } from '@nestjs/microservices';
import { FindOneUserDto } from 'apps/auth/src/users/dto/user.dto';

@Injectable()
export class UsersService implements OnModuleInit {
  private usersService: UsersSerivceClient;

  constructor(@Inject(AUTH_SERVICE) private client: ClientGrpc) {}

  onModuleInit() {
    this.usersService = this.client.getService<UsersSerivceClient>(
      USERS_SERIVCE_SERVICE_NAME,
    );
  }

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.usersService.createUser(createUserDto);
    } catch (err) {
      throw err;
    }
  }

  async findAll() {
    return await this.usersService.findAllUsers({});
  }

  async findOne(data: FindOneUserDto) {
    return await this.usersService.findOneUser(data);
  }

  async update(id: string, updateUserDto: UpdateOneUserDto) {
    return await this.usersService.updateOneUser({ id, ...updateUserDto });
  }

  async remove(id: string) {
    return await this.usersService.removeOneUser({ id });
  }
}
