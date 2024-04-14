import { Column, Entity } from 'typeorm';
import { Product } from '.';
import { BaseEntity } from '../common-infra/crud-ops/entities/base.entity';
import { DeepPartial } from '../core-common/deep-partial';


export class PerformaInvoicMetadata {
    productId: string
    productionNo: string;
    sampleNo: string;
    noOfFaces: string
    finishing: string
    sizeInCm: string;
    noOfContainer: number;
    noOfPallets: [
        {
            pallets: number,
            boxPerPallets: number
        }
    ]
    totalBox: number;
    sqmtrBox: string;
    totalSqmtrBox: string;
    fobRate: number;
    totalFobAmount: number;
}
@Entity('performa_invoice')
export class PerformaInvoiceEntity extends BaseEntity {

    @Column()
    consignee: string;

    @Column({ type: 'date' })
    date: DeepPartial<Date>;

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

    @Column()
    paymentTerms: string;

    @Column()
    loadingPaymentCondition: string;

    /*     @ManyToOne(_ => Product, p => p.invoice, { createForeignKeyConstraints: false })
        @JoinColumn()
        product: DeepPartial<Product> */

    @Column({ type: 'simple-json', nullable: false })
    metadata: DeepPartial<PerformaInvoicMetadata[]>

    constructor(data: DeepPartial<{
        consignee: string,
        date: Date,
        piNo: string,
        iecCode: string,
        countryOfOrigin: string,
        portOfLoading: string,
        countryOfDestination: string,
        portOfDischarge: string,
        paymentTerms: string,
        loadingPaymentCondition: string,
        product: Product,
        metadata: PerformaInvoicMetadata[]
    }>) {
        super();
        this.consignee = data?.consignee;
        this.date = data?.date;
        this.piNo = data?.piNo;
        this.iecCode = data?.iecCode;
        this.countryOfOrigin = data?.countryOfOrigin;
        this.portOfLoading = data?.portOfLoading;
        this.countryOfDestination = data?.countryOfDestination;
        this.portOfDischarge = data?.portOfDischarge;
        this.paymentTerms = data?.paymentTerms;
        this.loadingPaymentCondition = data?.loadingPaymentCondition;
        this.metadata = data?.metadata;
    }
}
