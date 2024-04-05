import { Injectable } from "@nestjs/common";
import { PerformaInvoiceEntity } from "../../../entity/performa-invoice.entity";
import { PerformaInvoiceRepository } from "../infrastructure/performa-invoice.repositorty";
import { DeepPartial } from "../../../core-common/deep-partial";

@Injectable()
export class PerformaInvoiceService {
    constructor(
        private readonly pIRepo: PerformaInvoiceRepository
    ) {
    }

    public async createPerformaInvoice(piData: DeepPartial<PerformaInvoiceEntity>) {
        return await this.pIRepo.saveAll([piData])
    }
}