import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "../../entity";
import { PerformaInvoiceEntity } from "../../entity/performa-invoice.entity";
import { ProductRepository } from "../product/infrastructure/product.repository";
import { ProductService } from "../product/service/product.service";
import { PerformaInvoiceController } from "./api/controller/peforma-invoice.controller";
import { PerformaInvoiceRepository } from "./infrastructure/performa-invoice.repositorty";
import { PerformaInvoiceService } from "./service/performa-invoice.service";

@Module({
    imports: [TypeOrmModule.forFeature([PerformaInvoiceEntity, Product])],
    controllers: [PerformaInvoiceController],
    providers: [
        {
            provide: PerformaInvoiceService.name,
            useClass: PerformaInvoiceService
        },
        {
            provide: ProductService.name,
            useClass: ProductService
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