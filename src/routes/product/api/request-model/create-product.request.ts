import { DeepPartial } from "../../../../core-common/deep-partial";
import { RequestEnum } from "../../../../core-common/enum/request.enum";
import { CommonProductRequest } from "./common-product.request";

export class CreateProductRequest extends CommonProductRequest {
    constructor(data: DeepPartial<CommonProductRequest>) {
        super(data, RequestEnum.CREATE)
    }
}
