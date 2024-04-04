import { DeepPartial } from "../../../../core-common/deep-partial";
import { RequestEnum } from "../../../../core-common/enum/request.enum";
import { CommonProductRequest } from "./common-product.request";

export class DeleteProductRequest extends CommonProductRequest {
    constructor(data: DeepPartial<DeleteProductRequest>) {
        super(data, RequestEnum.DELETE)
    }
}
