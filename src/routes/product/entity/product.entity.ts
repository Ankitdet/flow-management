import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../../common-infra/crud-ops/entities/base.entity";

@Entity()
export class Product extends BaseEntity {
    @Column()
    productionNo: string;
    @Column()
    sampleNo: string;
    @Column()
    finishing: string;
    @Column()
    surface: string;
    @Column()
    face: string;
}