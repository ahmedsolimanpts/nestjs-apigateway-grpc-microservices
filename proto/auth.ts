/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "auth";

export interface UpdateOneUserDto {
  id: string;
}

export interface FindOneUserDto {
  id: string;
}

export interface Empty {
}

export interface Users {
  users: IUser[];
}

export interface CreateUserDto {
  email: string;
  username: string;
  password: string;
}

export interface IUser {
  Id: string;
  username: string;
  email: string;
  password: string;
}

export const AUTH_PACKAGE_NAME = "auth";

export interface UsersSerivceClient {
  createUser(request: CreateUserDto): Observable<IUser>;

  findAllUsers(request: Empty): Observable<Users>;

  findOneUser(request: FindOneUserDto): Observable<IUser>;

  updateOneUser(request: UpdateOneUserDto): Observable<IUser>;

  removeOneUser(request: FindOneUserDto): Observable<IUser>;
}

export interface UsersSerivceController {
  createUser(request: CreateUserDto): Promise<IUser> | Observable<IUser> | IUser;

  findAllUsers(request: Empty): Promise<Users> | Observable<Users> | Users;

  findOneUser(request: FindOneUserDto): Promise<IUser> | Observable<IUser> | IUser;

  updateOneUser(request: UpdateOneUserDto): Promise<IUser> | Observable<IUser> | IUser;

  removeOneUser(request: FindOneUserDto): Promise<IUser> | Observable<IUser> | IUser;
}

export function UsersSerivceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createUser", "findAllUsers", "findOneUser", "updateOneUser", "removeOneUser"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UsersSerivce", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UsersSerivce", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USERS_SERIVCE_SERVICE_NAME = "UsersSerivce";
