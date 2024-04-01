import { Body, Controller, Inject, Injectable, Post } from "@nestjs/common";
import { CreateProductRequest } from "../request-model/create-product.request";
import { ProductService } from "../../service/product.service";

@Injectable()
@Controller('product')
export class ProductInfoController {

    constructor(
        @Inject(ProductService.name)
        private productService: ProductService
    ) {

    }

    @Post()
    public async createProduct(@Body() create: CreateProductRequest) {
        const prepareObj = new CreateProductRequest(create)
        return await this.productService.createProduct(prepareObj)
    }
}