import { Inject, Injectable } from "@nestjs/common";
import * as ExcelJS from 'exceljs';
import { AwsS3Service } from "../../../common-infra/s3-services/s3-service.provider";
import { DeepPartial } from "../../../core-common/deep-partial";
import { Result } from "../../../core-common/result-model";
import { PerformaInvoiceEntity } from "../../../entity/performa-invoice.entity";
import { CreatePIRequst } from "../api/request-model/create-pi.request";
import { PerformaInvoiceRepository } from "../infrastructure/performa-invoice.repositorty";

@Injectable()
export class PerformaInvoiceService {
    constructor(
        private readonly pIRepo: PerformaInvoiceRepository,
        @Inject(AwsS3Service.name)
        private readonly s3Service: AwsS3Service
    ) {
    }

    public async createPerformaInvoice(piData: DeepPartial<CreatePIRequst>) {

        const piEntity: DeepPartial<PerformaInvoiceEntity> = {
            ...piData,
        }

        return await this.pIRepo.saveAll([piEntity])
    }

    public async getProductById(id: string) {
        return await this.pIRepo.findById({ where: { id } })
    }

    public async createExcel() {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Performa Invoice');

        worksheet.mergeCells('A1:I1');
        const mergedCell = worksheet.getCell('A1');
        mergedCell.value = 'Performa Invoice';
        mergedCell.alignment = { vertical: 'middle', horizontal: 'center' };
        mergedCell.font = { bold: true };

        worksheet.mergeCells('A2:E2');
        const mergedCellA2E2 = worksheet.getCell('A2');
        mergedCellA2E2.value = 'Consigner:-';
        mergedCellA2E2.alignment = { vertical: 'middle', horizontal: 'center' };
        mergedCellA2E2.font = { bold: true };

        worksheet.mergeCells('A9:E9');
        const mergedCellA9E9 = worksheet.getCell('A9');
        mergedCellA9E9.value = 'Consignee:-';
        mergedCellA9E9.alignment = { vertical: 'middle', horizontal: 'center' };
        mergedCellA9E9.font = { bold: true };


        worksheet.mergeCells('A10:E15');
        const mergedCellA10E15 = worksheet.getCell('A10');
        mergedCellA10E15.value = 'VELLOZA GRANITO LLP\nSURVAY NO 185 P2 P1, OPP KHOKHARA HANUMAN,\nKHOKHARA HANUMAN ROAD, AT - KERALA,\nMORBI, GUJRAT, INDIA - 363630\nGST NO :- 24AATFV0318H1Z3\nMOB :-(+91)9712533336';
        mergedCellA10E15.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        mergedCellA10E15.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };

        worksheet.mergeCells('A3:E8');
        const mergedCellA3E8 = worksheet.getCell('A3');
        mergedCellA3E8.value = 'VELLOZA GRANITO LLP\nSURVAY NO 185 P2 P1, OPP KHOKHARA HANUMAN,\nKHOKHARA HANUMAN ROAD, AT - KERALA,\nMORBI, GUJRAT, INDIA - 363630\nGST NO :- 24AATFV0318H1Z3\nMOB :-(+91)9712533336';
        mergedCellA3E8.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        mergedCellA3E8.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };


        worksheet.mergeCells('F2:I2');
        const mergedCellF2I2 = worksheet.getCell('F2');
        mergedCellF2I2.value = 'PI NO. :- AKK-321';
        mergedCellF2I2.alignment = { vertical: 'middle', horizontal: 'center' };
        mergedCellF2I2.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };


        worksheet.mergeCells('F3:I3');
        const mergedCellF3I3 = worksheet.getCell('F3');
        mergedCellF3I3.value = 'DATE :- 01.09.2023';
        mergedCellF3I3.alignment = { vertical: 'middle', horizontal: 'center' };
        mergedCellF3I3.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };

        worksheet.mergeCells('F4:I4');
        const mergedCellF4I4 = worksheet.getCell('F4');
        mergedCellF4I4.value = 'IEC CODE :- AATFV0318H';
        mergedCellF4I4.alignment = { vertical: 'middle', horizontal: 'center' };
        mergedCellF4I4.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };

        worksheet.mergeCells('F5:I5');
        const mergedCellF5I5 = worksheet.getCell('F5');
        mergedCellF5I5.value = 'COUNTRY OF ORIGIN';
        mergedCellF5I5.alignment = { vertical: 'middle', horizontal: 'center' };
        mergedCellF5I5.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };

        worksheet.mergeCells('F6:I6');
        const mergedCellF6I6 = worksheet.getCell('F6');
        mergedCellF6I6.value = 'India';
        mergedCellF6I6.alignment = { vertical: 'middle', horizontal: 'center' };
        mergedCellF6I6.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };

        worksheet.mergeCells('F7:I7');
        const mergedCellF7I7 = worksheet.getCell('F7');
        mergedCellF7I7.value = 'PORT OF LOADING';
        mergedCellF7I7.alignment = { vertical: 'middle', horizontal: 'center' };
        mergedCellF7I7.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };

        worksheet.mergeCells('F8:I8');
        const mergedCellF8I8 = worksheet.getCell('F8');
        mergedCellF8I8.value = 'Mundra';
        mergedCellF8I8.alignment = { vertical: 'middle', horizontal: 'center' };
        mergedCellF8I8.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };

        worksheet.mergeCells('F9:I9');
        const mergedCellF9I9 = worksheet.getCell('F9');
        mergedCellF9I9.value = 'Carriage by:-';
        mergedCellF9I9.alignment = { vertical: 'middle', horizontal: 'center' };
        mergedCellF9I9.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };


        worksheet.mergeCells('F10:I10');
        const mergedCellF10I10 = worksheet.getCell('F10');
        mergedCellF10I10.value = 'SEA';
        mergedCellF10I10.alignment = { vertical: 'middle', horizontal: 'center' };
        mergedCellF10I10.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };

        worksheet.mergeCells('F11:O11');
        const mergedCellF11O11 = worksheet.getCell('F11');
        mergedCellF11O11.value = 'PAYMENT TERMS:-';
        mergedCellF11O11.alignment = { vertical: 'middle', horizontal: 'center' };
        mergedCellF11O11.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };


        worksheet.mergeCells('F12:O12');
        const mergedCellF12O12 = worksheet.getCell('F12');
        mergedCellF12O12.value = '';
        mergedCellF12O12.alignment = { vertical: 'middle', horizontal: 'center' };
        mergedCellF12O12.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };

        worksheet.mergeCells('F13:O13');
        const mergedCellF13O13 = worksheet.getCell('F13');
        mergedCellF13O13.value = 'LOADING AND PAYMENT CONDITION:-';
        mergedCellF13O13.alignment = { vertical: 'middle', horizontal: 'center' };
        mergedCellF13O13.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };


        worksheet.mergeCells('F14:O14');
        const mergedCellF14O14 = worksheet.getCell('F14');
        mergedCellF14O14.value = 'Shipment date: 20 DAYS LOAD AFTER CONFORMING ORDER ';
        mergedCellF14O14.alignment = { vertical: 'middle', horizontal: 'center' };
        mergedCellF14O14.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };


        worksheet.mergeCells('F15:O15');
        const mergedCellF15O15 = worksheet.getCell('F15');
        mergedCellF15O15.value = 'THIS PRICES ARE VALID TILL 6 DAYS FROM PROFORMA INVOICE DATE ';
        mergedCellF15O15.alignment = { vertical: 'middle', horizontal: 'center' };
        mergedCellF15O15.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };

        worksheet.mergeCells('J5:O5');
        const mergedCellJ5O5 = worksheet.getCell('J5');
        mergedCellJ5O5.value = 'COUNTRY OF DESTINATION';
        mergedCellJ5O5.alignment = { vertical: 'middle', horizontal: 'center' };
        mergedCellJ5O5.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };

        worksheet.mergeCells('J6:O6');
        const mergedCellJ6O6 = worksheet.getCell('J6');
        mergedCellJ6O6.value = '';
        mergedCellJ6O6.alignment = { vertical: 'middle', horizontal: 'center' };
        mergedCellJ6O6.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };

        worksheet.mergeCells('J7:O7');
        const mergedCellJ7O8 = worksheet.getCell('J7');
        mergedCellJ7O8.value = 'PORT OF DISCHARGE';
        mergedCellJ7O8.alignment = { vertical: 'middle', horizontal: 'center' };
        mergedCellJ7O8.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };

        worksheet.mergeCells('J8:O8');
        const mergedCellJ8O8 = worksheet.getCell('J8');
        mergedCellJ8O8.value = '';
        mergedCellJ8O8.alignment = { vertical: 'middle', horizontal: 'center' };
        mergedCellJ8O8.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };


        worksheet.mergeCells('J9:O9');
        const mergedCellJ9O9 = worksheet.getCell('J9');
        mergedCellJ9O9.value = 'NO. OF CONTAINER';
        mergedCellJ9O9.alignment = { vertical: 'middle', horizontal: 'center' };
        mergedCellJ9O9.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };

        worksheet.mergeCells('J10:O10');
        const mergedCellJ10O10 = worksheet.getCell('J10');
        mergedCellJ10O10.value = '';
        mergedCellJ10O10.alignment = { vertical: 'middle', horizontal: 'center' };
        mergedCellJ10O10.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };

        const base64 = await this.s3Service.s3UrlToBase64('s3://general-purpose-tiles/velloza_company_icon.png')
        const imageId = workbook.addImage({
            base64,
            extension: 'jpeg',
        });

        worksheet.addImage(imageId, {
            tl: { col: 9, row: 0 },
            ext: { width: 200, height: 100 } // dimensions of the image});
        })

        const buffer = await workbook.xlsx.writeBuffer();

        // Upload buffer to S3 bucket
        const uploadParams = {
            Bucket: 'general-purpose-tiles',
            Key: 'image_in_cells.xlsx',
            Body: buffer,
            ContentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        };

        await this.s3Service.uploadToS3(uploadParams)
        // Save the workbook
        return Result.success("done");
    }
}