import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AwsS3Service } from "../../common-infra/s3-services/s3-service.provider";
import { Product } from "../../entity/product.entity";
import { ProductInfoController } from "./api/controller/product.controller";
import { ProductRepository } from "./infrastructure/product.repository";
import { ProductService } from "./service/product.service";

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
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