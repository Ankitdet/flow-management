import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AwsS3Service } from "../../common-infra/s3-services/s3-service.provider";
import { Product } from "../../entity/product.entity";
import { ProductInfoController } from "./api/controller/product.controller";
import { ProductRepository } from "./infrastructure/product.repository";
import { ProductService } from "./service/product.service";
import { PerformaInvoiceRepository } from "../performa-invoice/infrastructure/performa-invoice.repositorty";
import { PerformaInvoiceEntity } from "../../entity";

@Module({
    imports: [TypeOrmModule.forFeature([Product, PerformaInvoiceEntity])],
    controllers: [ProductInfoController],
    providers: [
        {
            provide: ProductService.name,
            useClass: ProductService
        },
        {
            provide: AwsS3Service.name,
            useClass: AwsS3Service
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