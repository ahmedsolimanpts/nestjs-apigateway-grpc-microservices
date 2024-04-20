import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { randomUUID } from 'crypto';
import {
  User,
  CreateUserDto,
  Users,
  UpdateOneUserDto,
  PaginationDto,
} from '@app/common';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class UsersService implements OnModuleInit {
  private readonly users: User[] = [];

  onModuleInit() {
    // for(let i=0; i<=100;i++){
    // }
  }

  create(createUserDto: CreateUserDto): User {
    const user: User = {
      ...createUserDto,
      id: randomUUID(),
    };
    this.users.push(user);
    return user;
  }

  findAll(): Users {
    return { users: this.users };
  }

  findOne(id: string): User {
    return this.users.find((user) => user.id === id);
  }

  update(id: string, updateUserDto: UpdateOneUserDto) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex != -1) {
      this.users[userIndex] = {
        ...this.users[userIndex],
        ...updateUserDto,
      };
      return this.users[userIndex];
    }
    throw new NotFoundException('User Not Exist');
  }

  remove(id: string) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex != -1) {
      return this.users.splice(userIndex)[0];
    }
    throw new NotFoundException('User Not Exist');
  }

  queryUsers(
    paginationDtoStream: Observable<PaginationDto>,
  ): Observable<Users> {
    const subject = new Subject<Users>();
    const onNext = (paginationDto: PaginationDto) => {
      const start = paginationDto.page * paginationDto.skip;
      subject.next({
        users: this.users.slice(start, start + paginationDto.skip),
      });
    };
    const onCompelete = () => subject.complete();
    paginationDtoStream.subscribe({
      next: onNext,
      complete: onCompelete,
    });

    return subject.asObservable();
  }
}
