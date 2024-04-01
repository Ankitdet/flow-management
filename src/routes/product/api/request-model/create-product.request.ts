import { RequestEnum } from "../../../../core-common/enum/request.enum";
import { CommonProductRequest } from "./common-product.request";

export class CreateProductRequest extends CommonProductRequest {
    constructor(data: CommonProductRequest) {
        super(data, RequestEnum.CREATE)
    }
}
