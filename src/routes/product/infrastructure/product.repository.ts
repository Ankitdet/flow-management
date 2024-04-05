import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseRepository } from "../../../common-infra/crud-ops/repo/base-crud.repository";
import { Product } from "../../../entity/product.entity";

@Injectable()
export class ProductRepository extends BaseRepository<Product> {
    constructor(@InjectRepository(Product) productRepository: Repository<Product>) {
        super(productRepository);
    }
}