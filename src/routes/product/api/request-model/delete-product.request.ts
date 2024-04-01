import { RequestEnum } from "../../../../core-common/enum/request.enum";
import { CommonProductRequest } from "./common-product.request";

export class UpdateProductRequest extends CommonProductRequest {
    constructor(data: CommonProductRequest) {
        super(data, RequestEnum.DELETE)
    }
}
