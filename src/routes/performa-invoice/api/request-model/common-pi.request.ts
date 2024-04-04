import { DeepPartial } from '../../../../core-common/deep-partial';
import { RequestEnum } from '../../../../core-common/enum/request.enum';
import { Product } from '../../../product/entity/product.entity';

export class CommonPIRequest {
    id: string;
    product: DeepPartial<Product>;
    consignee: string;
    date: DeepPartial<Date>;
    piNo: string;
    iecCode: string;
    countryOfOrigin: string;
    portOfLoading: string;
    countryOfDestination: string;
    portOfDischarge: string;
    noOfContainer: number;
    paymentTerms: string;
    loadingPaymentCondition: string;
    sizeInCm: string;
    pallets: number[];
    boxPerPallets: number[];
    totalBox: number;
    sqmtrBox: string;
    totalSqmtrBox: string;
    fobRate: number;
    totalFobAmount: number;
    images: string[]

    constructor(data: DeepPartial<{
        id: string,
        consignee: string,
        date: Date,
        piNo: string,
        iecCode: string,
        countryOfOrigin: string,
        portOfLoading: string,
        countryOfDestination: string,
        portOfDischarge: string,
        noOfContainer: number,
        paymentTerms: string,
        loadingPaymentCondition: string,
        sizeInCm: string,
        pallets: number[],
        boxPerPallets: number[],
        totalBox: number,
        sqmtrBox: string,
        totalSqmtrBox: string,
        fobRate: number,
        totalFobAmount: number,
        images: string[],
        product?: Product
    }>, operation: string) {
        this.id = data.id
        this.consignee = data.consignee;
        this.date = data.date;
        this.piNo = data.piNo;
        this.iecCode = data.iecCode;
        this.countryOfOrigin = data.countryOfOrigin;
        this.portOfLoading = data.portOfLoading;
        this.countryOfDestination = data.countryOfDestination;
        this.portOfDischarge = data.portOfDischarge;
        this.noOfContainer = data.noOfContainer;
        this.paymentTerms = data.paymentTerms;
        this.loadingPaymentCondition = data.loadingPaymentCondition;
        this.sizeInCm = data.sizeInCm;
        this.pallets = data.pallets;
        this.boxPerPallets = data.boxPerPallets;
        this.totalBox = data.totalBox;
        this.sqmtrBox = data.sqmtrBox;
        this.totalSqmtrBox = data.totalSqmtrBox;
        this.fobRate = data.fobRate;
        this.totalFobAmount = data.totalFobAmount;
        this.images = data.images
        if (data?.product) {
            this.product = data.product;
        }

        if (operation === RequestEnum.CREATE) {
            delete this.id
        }

    }
}
