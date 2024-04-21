import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './Schema/user.schema';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { IUser } from '@app/common';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = new this.userModel(createUserDto);
      return await newUser.save();
    } catch (err) {
      throw err;
    }
  }

  async findAll() {
    try {
      const userDocuments = await this.userModel.find().exec();
      const users = userDocuments.map((user) => ({
        Id: user._id.toString(),
        username: user.username,
        email: user.email,
        password: user.password,
      }));
      return { users };
    } catch (err) {
      throw err;
    }
  }

  async findOne(id: string): Promise<IUser> {
    try {
      const user = await this.userModel.findById(id).exec();
      return {
        Id: user._id.toString(),
        username: user.username,
        email: user.email,
        password: user.password,
      };
    } catch (err) {
      throw err;
    }
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const id = updateUserDto.id;
      return this.userModel.findByIdAndUpdate(id, updateUserDto, {
        new: true,
      });
    } catch (err) {
      throw err;
    }
  }

  remove(id: string) {
    try {
      return this.userModel.findByIdAndDelete(id);
    } catch (err) {
      throw err;
    }
  }
}
