import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PerformaInvoiceEntity } from "./entity/performa-invoice.entity";
import { PerformaInvoiceRepository } from "./infrastructure/performa-invoice.repositorty";
import { PerformaInvoiceService } from "./service/performa-invoice.service";
import { PerformaInvoiceController } from "./api/controller/peforma-invoice.controller";

@Module({
    imports: [TypeOrmModule.forFeature([PerformaInvoiceEntity])],
    controllers: [PerformaInvoiceController],
    providers: [
        {
            provide: PerformaInvoiceService.name,
            useClass: PerformaInvoiceService
        },
        PerformaInvoiceRepository
    ],
    exports: [
        {
            provide: PerformaInvoiceService.name,
            useClass: PerformaInvoiceService
        },
        PerformaInvoiceRepository
    ]
})
export class PerformaInvoiceModule { }