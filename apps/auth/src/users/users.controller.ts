import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  UsersSerivceController,
  UsersSerivceControllerMethods,
  CreateUserDto,
  UpdateOneUserDto,
  FindOneUserDto,
  PaginationDto,
} from '@app/common';
import { Observable } from 'rxjs';

@Controller()
@UsersSerivceControllerMethods()
export class UsersController implements UsersSerivceController {
  constructor(private readonly usersService: UsersService) {}

  createUser(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  findAllUsers() {
    return this.usersService.findAll();
  }

  findOneUser(findOneUserDto: FindOneUserDto) {
    return this.usersService.findOne(findOneUserDto.id);
  }

  updateOneUser(updateUserDto: UpdateOneUserDto) {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  removeOneUser(findOneUserDto: FindOneUserDto) {
    return this.usersService.remove(findOneUserDto.id);
  }

  queryUsers(paginationDto: Observable<PaginationDto>) {
    return this.usersService.queryUsers(paginationDto);
  }
}
