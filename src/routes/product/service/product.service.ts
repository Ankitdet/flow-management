import { Inject, Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
import { ListQuery } from "../../../common-infra/crud-ops/list-query";
import { IMAGE_FOLDER } from "../../../common-infra/s3-services/s3-constant";
import { AwsS3Service } from "../../../common-infra/s3-services/s3-service.provider";
import { DeepPartial } from "../../../core-common/deep-partial";
import { Result } from "../../../core-common/result-model";
import { Product } from "../../../entity/product.entity";
import { PerformaInvoiceRepository } from "../../performa-invoice/infrastructure/performa-invoice.repositorty";
import { ListProductRequest } from "../api/request-model/list-product.request";
import { ProductRepository } from "../infrastructure/product.repository";

@Injectable()
export class ProductService {
    constructor(
        private readonly prodRepo: ProductRepository,
        @Inject(AwsS3Service.name)
        private readonly s3Service: AwsS3Service,
        private readonly performaInvoice: PerformaInvoiceRepository
    ) {
        console.log(this.performaInvoice)
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

    public async listProduct(listQuery: ListQuery<ListProductRequest>) {
        const result = await this.prodRepo.findAll({
            order: { [listQuery.sortColumn]: listQuery.sortDirection },
            skip: listQuery.offset,
            take: listQuery.limit,
            where: ListProductRequest.buildWhereCondition(listQuery.query)
        })
        Result.throwIfFailed(result)
        return result
    }

    public async getUploadPreSignUrl(keys: string[]) {
        const uuid = uuidv4()
        const newkeys = keys.map((m) => `images/${uuid}/` + m)

        const presignedUrls = await this.s3Service.batchPutPresignedUrls(IMAGE_FOLDER, newkeys)
        Result.throwIfFailed(presignedUrls)

        return {
            folderId: uuid,
            presignedUrls: presignedUrls.data
        }
    }

    public async downloadImagePreSignUrls(productId: string) {
        const folderName = (await this.prodRepo.findById({ where: { id: productId } }))?.data?.folderId
        return await this.s3Service.getAllPresignedUrls(`images/${folderName}`, IMAGE_FOLDER)
    }

}