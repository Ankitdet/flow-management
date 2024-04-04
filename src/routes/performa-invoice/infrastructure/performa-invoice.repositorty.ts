import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseRepository } from "../../../common-infra/crud-ops/repo/base-crud.repository";
import { PerformaInvoiceEntity } from "../entity/performa-invoice.entity";

@Injectable()
export class PerformaInvoiceRepository extends BaseRepository<PerformaInvoiceEntity> {
    constructor(@InjectRepository(PerformaInvoiceEntity) pIRepo: Repository<PerformaInvoiceEntity>) {
        super(pIRepo);
    }
}