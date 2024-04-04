import { DeepPartial } from "typeorm";
import { RequestEnum } from "../../../../core-common/enum/request.enum";
import { CommonProductRequest } from "./common-product.request";

export class UpdateProductRequest extends CommonProductRequest {
    constructor(data: DeepPartial<UpdateProductRequest>) {
        super(data, RequestEnum.UPDATE)
    }
}
