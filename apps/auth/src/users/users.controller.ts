import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateUserDto, FindOneUserDto, UpdateUserDto } from './dto/user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @GrpcMethod('UsersSerivce', 'CreateUser')
  createUser(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @GrpcMethod('UsersSerivce', 'FindAllUsers')
  async findAllUsers() {
    return await this.usersService.findAll();
  }

  @GrpcMethod('UsersSerivce', 'FindOneUser')
  async findOneUser(data: FindOneUserDto) {
    return await this.usersService.findOne(data.id);
  }

  @GrpcMethod('UsersSerivce', 'UpdateOneUser')
  updateOneUser(updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  @GrpcMethod('UsersSerivce', 'RemoveOneUser')
  removeOneUser(findOneUserDto: FindOneUserDto) {
    return this.usersService.remove(findOneUserDto.id);
  }
}
