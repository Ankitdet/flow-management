import { RequestEnum } from "../../../../core-common/enum/request.enum";
import { CommonPIRequest } from "./common-pi.request";

export class CreatePIRequst extends CommonPIRequest {
    constructor(data: CreatePIRequst) {
        super(data, RequestEnum.CREATE)
    }
}