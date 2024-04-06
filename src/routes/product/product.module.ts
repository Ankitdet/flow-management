import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PerformaInvoiceEntity } from "../../entity";
import { Product } from "../../entity/product.entity";
import { PerformaInvoiceRepository } from "../performa-invoice/infrastructure/performa-invoice.repositorty";
import { PerformaInvoiceService } from "../performa-invoice/service/performa-invoice.service";
import { ProductInfoController } from "./api/controller/product.controller";
import { ProductRepository } from "./infrastructure/product.repository";
import { ProductService } from "./service/product.service";

@Module({
    imports: [TypeOrmModule.forFeature([Product, PerformaInvoiceEntity])],
    controllers: [ProductInfoController],
    providers: [
        {
            provide: ProductService.name,
            useClass: ProductService
        },
        {
            provide: PerformaInvoiceService.name,
            useClass: PerformaInvoiceService
        },
        ProductRepository,
        PerformaInvoiceRepository
    ],
    exports: [
        {
            provide: ProductService.name,
            useClass: ProductService
        },
        ProductRepository
    ]
})
export class ProductModule { }