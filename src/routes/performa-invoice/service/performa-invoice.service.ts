import { Injectable } from "@nestjs/common";
import { DeepPartial } from "../../../core-common/deep-partial";
import { PerformaInvoiceEntity } from "../../../entity/performa-invoice.entity";
import { CreatePIRequst } from "../api/request-model/create-pi.request";
import { PerformaInvoiceRepository } from "../infrastructure/performa-invoice.repositorty";

@Injectable()
export class PerformaInvoiceService {
    constructor(
        private readonly pIRepo: PerformaInvoiceRepository,
    ) {
    }

    public async createPerformaInvoice(piData: DeepPartial<CreatePIRequst>) {

        const piEntity: DeepPartial<PerformaInvoiceEntity> = {
            ...piData,
        }

        return await this.pIRepo.saveAll([piEntity])
    }

    public async getProductById(id: string) {
        return await this.pIRepo.findById({ where: { id } })
    }
}