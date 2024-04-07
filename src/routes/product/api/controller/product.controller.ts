import { Body, Controller, Delete, Get, Inject, Injectable, Param, Patch, Post, Query } from "@nestjs/common";
import { ListQuery } from "../../../../common-infra/crud-ops/list-query";
import { ProductService } from "../../service/product.service";
import { CreateProductRequest } from "../request-model/create-product.request";
import { DeleteProductRequest } from "../request-model/delete-product.request";
import { ListProductRequest } from "../request-model/list-product.request";
import { UpdateProductRequest } from "../request-model/update-product.request";

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

    @Get('all')
    public async listProduct(
        @Query('offset') offset: number,
        @Query('limit') limit: number,
        @Query('sortColumn') column: string,
        @Query('sortDirection') direction: 'ASC' | 'DESC',
        @Query('finishing') finishing: string[],
    ) {
        const listObj = new ListQuery<ListProductRequest>({ finishing }, offset, limit, column, direction)
        return await this.productService.listProduct(listObj)
    }

    @Patch()
    public async updateProduct(@Body() update: UpdateProductRequest) {
        const updateObj = new UpdateProductRequest(update)
        return await this.productService.updateProduct(updateObj)
    }

    @Delete(':id')
    public async deleteProduct(@Param('id') id: string) {
        const updateObj = new DeleteProductRequest({ id })
        return await this.productService.deleteProductById(updateObj)
    }

    @Post('upload-url')
    public async getUploadUrl(@Body() uploadUrls: string[]) {
        return await this.productService.getUploadPreSignUrl(uploadUrls)
    }

    @Get('download-url')
    public async getImageUrl(@Query('productId') productId: string) {
        return await this.productService.downloadImagePreSignUrls(productId)
    }

    @Get(':id')
    public async getProductById(@Param('id') id: string) {
        return await this.productService.getProductById(id)
    }

}