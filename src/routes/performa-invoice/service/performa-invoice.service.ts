import { HttpStatus, Injectable } from "@nestjs/common";
import { DeepPartial } from "../../../core-common/deep-partial";
import { PerformaInvoiceEntity } from "../../../entity/performa-invoice.entity";
import { CreatePIRequst } from "../api/request-model/create-pi.request";
import { PerformaInvoiceRepository } from "../infrastructure/performa-invoice.repositorty";
import { ProductRepository } from "../../product/infrastructure/product.repository";
import { Result } from "../../../core-common/result-model";
import { CommonError } from "../../../core-common/common-error";

@Injectable()
export class PerformaInvoiceService {
    constructor(
        private readonly pIRepo: PerformaInvoiceRepository,
        private readonly productRepo: ProductRepository,
    ) {
    }

    public async createPerformaInvoice(piData: DeepPartial<CreatePIRequst>) {

        const productDetails = await this.productRepo.findById({ where: { id: piData.productId } })
        Result.throwIfFailed(productDetails)

        if (!productDetails.data) {
            return Result.failed(new CommonError('Product not found', `ProductId: ${piData.productId}`, HttpStatus.NOT_FOUND))
        }

        const piEntity: DeepPartial<PerformaInvoiceEntity> = {
            ...piData,
            product: productDetails.data
        }

        return await this.pIRepo.saveAll([piEntity])
    }
}