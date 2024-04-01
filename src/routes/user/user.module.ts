import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserService } from './service/user.service';
import { UserController } from './user.controller';
import { UserRepository } from './repo/user.repo';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserService, UserRepository],
    controllers: [UserController],
    exports: [UserService, UserRepository],
})
export class UserModule { }