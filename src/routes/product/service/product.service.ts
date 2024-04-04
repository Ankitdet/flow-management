import { Inject, Injectable } from "@nestjs/common";
import { DeepPartial } from "../../../core-common/deep-partial";
import { Result } from "../../../core-common/result-model";
import { Product } from "../entity/product.entity";
import { ProductRepository } from "../infrastructure/product.repositorty";
import { ListQuery } from "../../../common-infra/crud-ops/list-query";
import { ListProdcutRequest } from "../api/request-model/list-product.request";
import { AwsS3Service } from "../../../common-infra/s3-services/s3-service.provider";

@Injectable()
export class ProductService {
    constructor(
        private readonly prodRepo: ProductRepository,
        @Inject(AwsS3Service.name)
        private readonly s3Service: AwsS3Service
    ) {
    }
    public async createProduct(saveRequest: DeepPartial<Product>): Promise<Result<Product | Product[]>> {
        const resp = await this.prodRepo.saveAll([saveRequest])
        return resp
    }

    public async getProductById(id: string): Promise<Result<Product>> {
        return await this.prodRepo.findById({ where: { id } })
    }

    public async updateProduct(updateRequest: DeepPartial<Product>): Promise<Result<Product>> {
        const result = await this.prodRepo.update({ id: updateRequest.id }, updateRequest)
        Result.throwIfFailed(result)

        const getbyId = await this.prodRepo.findById({ where: { id: updateRequest.id } })
        Result.throwIfFailed(getbyId)

        return getbyId
    }

    public async deleteProductById(deleteRequest: DeepPartial<Product>): Promise<Result<string>> {
        const result = await this.prodRepo.delete({ id: deleteRequest.id })
        Result.throwIfFailed(result)
        return Result.success('Delete Success !!!')
    }

    public async listProduct(listQuery: ListQuery<ListProdcutRequest>) {
        const result = await this.prodRepo.findAll({
            order: { [listQuery.sortColumn]: listQuery.sortDirection },
            skip: listQuery.offset,
            take: listQuery.limit,
            where: { finishing: listQuery.query.finishing }
        })
        Result.throwIfFailed(result)
        return Result.success(result)
    }

    public async getUploadPreSignUrl(keys: string[]) {
        const newkeys = keys.map((m) => 'images/' + m)
        return await this.s3Service.batchPutPresignedUrls('general-purpose-tiles', newkeys)
    }

    public async downloadImagePreSignUrls(folderName: string) {
        const allUrls = await this.s3Service.getAllPresignedUrls(folderName, 'general-purpose-tiles')
        return Result.success(allUrls)
    }


}