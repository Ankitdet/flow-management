import { Column, Entity, OneToOne } from "typeorm";
import { PerformaInvoiceEntity } from ".";
import { BaseEntity } from "../common-infra/crud-ops/entities/base.entity";

@Entity('product')
export class Product extends BaseEntity {
    @Column()
    productionNo: string;
    @Column()
    sampleNo: string;
    @Column({ type: 'simple-array' })
    finishing: string[];
    @Column({ type: 'simple-array' })
    surface: string[];
    @Column({ type: 'simple-array' })
    face: string[];

    @Column({ type: 'simple-array' })
    size: string[];

    @Column()
    folderId: string

    @OneToOne(_ => PerformaInvoiceEntity, iv => iv.product, {
        createForeignKeyConstraints: false
    })
    invoice: PerformaInvoiceEntity

}