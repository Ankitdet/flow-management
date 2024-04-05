import { Column, Entity, OneToOne } from "typeorm";
import { PerformaInvoiceEntity } from ".";
import { BaseEntity } from "../common-infra/crud-ops/entities/base.entity";

@Entity('product')
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

    @OneToOne(_ => PerformaInvoiceEntity, iv => iv.product)
    invoice: PerformaInvoiceEntity

}