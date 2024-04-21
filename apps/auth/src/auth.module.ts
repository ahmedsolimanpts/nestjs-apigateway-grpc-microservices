import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRootAsync({
      imports: [],
      useFactory: () => ({ uri: 'mongodb://root:root@mongo:27017/auth?' }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AuthModule {}
