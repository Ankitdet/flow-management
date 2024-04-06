import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../common-infra/crud-ops/entities/base.entity';
import { Product } from '.';

@Entity('performa_invoice')
export class PerformaInvoiceEntity extends BaseEntity {

    @Column()
    consignee: string;

    @Column({ type: 'date' })
    date: Date;

    @Column()
    piNo: string;

    @Column()
    iecCode: string;

    @Column()
    countryOfOrigin: string;

    @Column()
    portOfLoading: string;

    @Column()
    countryOfDestination: string;

    @Column()
    portOfDischarge: string;

    @Column({ type: 'integer' })
    noOfContainer: number;

    @Column()
    paymentTerms: string;

    @Column()
    loadingPaymentCondition: string;

    @Column()
    sizeInCm: string;

    @Column('simple-array', { name: 'pallets' })
    pallets: number[];

    @Column('simple-array', { name: 'boxPerPallets' })
    boxPerPallets: number[];

    @Column({ type: 'integer' })
    totalBox: number;

    @Column({ name: 'sqmtrBox' })
    sqmtrBox: string;

    @Column({ name: 'totalSqmtrBox' })
    totalSqmtrBox: string;

    @Column({ type: 'float' })
    fobRate: number;

    @Column({ type: 'float' })
    totalFobAmount: number;

    @Column('simple-array', { name: 'images' })
    images: string[];

    @ManyToOne(_ => Product, p => p.invoice, { createForeignKeyConstraints: false })
    @JoinColumn()
    product: Product
}
