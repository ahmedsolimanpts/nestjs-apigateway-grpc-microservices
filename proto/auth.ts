/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "auth";

export interface PaginationDto {
  page: number;
  skip: number;
}

export interface UpdateOneUserDto {
  id: string;
}

export interface FindOneUserDto {
  id: string;
}

export interface Empty {
}

export interface Users {
  users: User[];
}

export interface CreateUserDto {
  email: string;
  username: string;
  password: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

export const AUTH_PACKAGE_NAME = "auth";

export interface UsersSerivceClient {
  createUser(request: CreateUserDto): Observable<User>;

  findAllUsers(request: Empty): Observable<Users>;

  findOneUser(request: FindOneUserDto): Observable<User>;

  updateOneUser(request: UpdateOneUserDto): Observable<User>;

  removeOneUser(request: FindOneUserDto): Observable<User>;

  queryUsers(request: Observable<PaginationDto>): Observable<Users>;
}

export interface UsersSerivceController {
  createUser(request: CreateUserDto): Promise<User> | Observable<User> | User;

  findAllUsers(request: Empty): Promise<Users> | Observable<Users> | Users;

  findOneUser(request: FindOneUserDto): Promise<User> | Observable<User> | User;

  updateOneUser(request: UpdateOneUserDto): Promise<User> | Observable<User> | User;

  removeOneUser(request: FindOneUserDto): Promise<User> | Observable<User> | User;

  queryUsers(request: Observable<PaginationDto>): Observable<Users>;
}

export function UsersSerivceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createUser", "findAllUsers", "findOneUser", "updateOneUser", "removeOneUser"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UsersSerivce", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = ["queryUsers"];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UsersSerivce", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USERS_SERIVCE_SERVICE_NAME = "UsersSerivce";
