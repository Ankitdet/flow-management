import { Injectable } from '@nestjs/common';
import { Result } from '../../../core-common/result-model';
import { User } from '../entity/user.entity';
import { UserRepository } from '../repo/user.repo';

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) {
    }

    public async findAll(): Promise<Result<User[]>> {
        return this.userRepository.findAll();
    }

    public async save(data: any): Promise<Result<User[]>> {
        return await this.userRepository.save(data);
    }
}
