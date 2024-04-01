import { Injectable } from "@nestjs/common";
import { DeepPartial } from "../../../core-common/deep-partial";
import { Result } from "../../../core-common/result-model";
import { Product } from "../entity/product.entity";
import { ProductRepository } from "../infrastructure/product.repositorty";

@Injectable()
export class ProductService {
    constructor(
        private prodRepo: ProductRepository) {
    }
    public async createProduct(saveRequest: DeepPartial<Product>): Promise<Result<Product | Product[]>> {
        const resp = await this.prodRepo.saveAll([saveRequest])
        return resp
    }
}