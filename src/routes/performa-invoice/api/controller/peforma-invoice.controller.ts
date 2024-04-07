import { Body, Controller, Get, Inject, Param, Post } from "@nestjs/common";
import { CreatePIRequst } from "../request-model/create-pi.request";
import { PerformaInvoiceService } from "../../service/performa-invoice.service";


@Controller('performa-invoice')
export class PerformaInvoiceController {
    constructor(
        @Inject(PerformaInvoiceService.name)
        private readonly piService: PerformaInvoiceService
    ) {
    }

    @Post()
    public async createProduct(@Body() create: CreatePIRequst) {
        const obj = new CreatePIRequst(create)
        return await this.piService.createPerformaInvoice(obj)
    }

    @Get(':id')
    public async getPerformaInvoiceById(@Param('id') id: string) {
        return await this.piService.getProductById(id)
    }
}