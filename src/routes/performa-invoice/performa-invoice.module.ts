import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PerformaInvoiceEntity } from "../../entity/performa-invoice.entity";
import { ProductRepository } from "../product/infrastructure/product.repository";
import { PerformaInvoiceController } from "./api/controller/peforma-invoice.controller";
import { PerformaInvoiceRepository } from "./infrastructure/performa-invoice.repositorty";
import { PerformaInvoiceService } from "./service/performa-invoice.service";
import { Product } from "../../entity";

@Module({
    imports: [TypeOrmModule.forFeature([PerformaInvoiceEntity, Product])],
    controllers: [PerformaInvoiceController],
    providers: [
        {
            provide: PerformaInvoiceService.name,
            useClass: PerformaInvoiceService
        },
        ProductRepository,
        PerformaInvoiceRepository
    ],
    exports: [
        {
            provide: PerformaInvoiceService.name,
            useClass: PerformaInvoiceService
        },
        PerformaInvoiceRepository
    ]
})
export class PerformaInvoiceModule { }