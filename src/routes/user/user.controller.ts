import {
    Body,
    Controller,
    Get,
    Post
} from '@nestjs/common';
import { Result } from '../../core-common/result-model';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import { UserService } from './service/user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('/')
    async save(@Body() data: CreateUserDto): Promise<Result<unknown>> {
        return await this.userService.save(data);
    }

    @Get('/')
    async findAll(): Promise<Result<User[]>> {
        return await this.userService.findAll()
    }
}