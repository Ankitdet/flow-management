import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductInfoController } from "./api/controller/product.controller";
import { Product } from "./entity/product.entity";
import { ProductRepository } from "./infrastructure/product.repositorty";
import { ProductService } from "./service/product.service";

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    controllers: [ProductInfoController],
    providers: [
        {
            provide: ProductService.name,
            useClass: ProductService
        },
        ProductRepository
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