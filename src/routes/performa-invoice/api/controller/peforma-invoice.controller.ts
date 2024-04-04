import { Body, Controller, Inject, Post } from "@nestjs/common";
import { CreatePIRequst } from "../request-model/create-pi.request";
import { PerformaInvoiceService } from "../../service/performa-invoice.service";


@Controller('performa-invoice')
export class PerformaInvoiceController {
    constructor(
        @Inject(PerformaInvoiceService.name)
        private readonly piRequest: PerformaInvoiceService
    ) {
    }

    @Post()
    public async createProduct(@Body() create: CreatePIRequst) {
        const obj = new CreatePIRequst(create)
        return await this.piRequest.createPerformaInvoice(obj)
    }

}