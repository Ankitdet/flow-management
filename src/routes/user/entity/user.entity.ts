import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common-infra/crud-ops/entities/base.entity';

@Entity()
export class User extends BaseEntity {
    @Column()
    name: string;
}