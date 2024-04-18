import { Inject, Injectable } from "@nestjs/common";
import dayjs from 'dayjs';
import * as ExcelJS from 'exceljs';
import PDFDocument from 'pdfkit';
import { AwsS3Service } from "../../../common-infra/s3-services/s3-service.provider";
import { DeepPartial } from "../../../core-common/deep-partial";
import { Result } from "../../../core-common/result-model";
import { PerformaInvoiceEntity } from "../../../entity/performa-invoice.entity";
import { CreatePIRequst } from "../api/request-model/create-pi.request";
import { PerformaInvoiceRepository } from "../infrastructure/performa-invoice.repositorty";
const fs = require('fs');

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

        piData.date = new Date().toISOString()

        return await this.pIRepo.saveAll([piEntity])
    }

    public async getProductById(id: string) {
        return await this.pIRepo.findById({ where: { id } })
    }

    public async createExcel(piId: string) {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('PERFORMA INVOICE');

        worksheet.getColumn('A').width = 8;
        worksheet.getColumn('B').width = 20;
        worksheet.getColumn('C').width = 20;
        worksheet.getColumn('D').width = 10;
        worksheet.getColumn('E').width = 20;
        worksheet.getColumn('F').width = 10;
        worksheet.getColumn('G').width = 20;
        worksheet.getColumn('H').width = 10;
        worksheet.getColumn('I').width = 12;
        worksheet.getColumn('J').width = 15;
        worksheet.getColumn('K').width = 15;
        worksheet.getColumn('L').width = 15;
        worksheet.getColumn('M').width = 15;
        worksheet.getColumn('N').width = 15;
        worksheet.getColumn('O').width = 15;

        worksheet.mergeCells('A1:I1');
        const mergedCell = worksheet.getCell('A1');
        mergedCell.value = 'PERFORMA INVOICE';
        mergedCell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        mergedCell.font = { bold: true, size: 46 };
        mergedCell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        }

        worksheet.mergeCells('J1:O4');
        const mergedCellImage = worksheet.getCell('J1');
        mergedCellImage.value = '';
        mergedCellImage.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        const base64 = await this.s3Service.s3UrlToBase64('s3://general-purpose-tiles/velloza_company_icon.png')
        const imageId = workbook.addImage({
            base64,
            extension: 'png',
        });
        worksheet.addImage(imageId, {
            tl: { col: 9, row: 0 },
            ext: { width: 454, height: 120 },
            editAs: 'absolute'
        })

        worksheet.mergeCells('A2:E2');
        const mergedCellA2E2 = worksheet.getCell('A2');
        mergedCellA2E2.value = 'Consigner:-';
        mergedCellA2E2.alignment = { vertical: 'top', horizontal: 'left', wrapText: true };
        mergedCellA2E2.font = { bold: true, size: 26 };

        worksheet.mergeCells('A9:E9');
        const mergedCellA9E9 = worksheet.getCell('A9');
        mergedCellA9E9.value = 'Consignee:-';
        mergedCellA9E9.alignment = { vertical: 'top', horizontal: 'left', wrapText: true };
        mergedCellA9E9.font = { bold: true, size: 26 };


        worksheet.mergeCells('A10:E15');
        const mergedCellA10E15 = worksheet.getCell('A10');
        mergedCellA10E15.value = 'VELLOZA GRANITO LLP\nSURVAY NO 185 P2 P1, OPP KHOKHARA HANUMAN,\nKHOKHARA HANUMAN ROAD, AT - KERALA,\nMORBI, GUJRAT, INDIA - 363630\nGST NO :- 24AATFV0318H1Z3\nMOB :-(+91)9712533336';
        mergedCellA10E15.alignment = { vertical: 'top', horizontal: 'left', wrapText: true };
        mergedCellA10E15.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };
        mergedCellA10E15.font = { bold: false, size: 18 };


        worksheet.mergeCells('A3:E8');
        const mergedCellA3E8 = worksheet.getCell('A3');
        mergedCellA3E8.value = 'VELLOZA GRANITO LLP\nSURVAY NO 185 P2 P1, OPP KHOKHARA HANUMAN,\nKHOKHARA HANUMAN ROAD, AT - KERALA,\nMORBI, GUJRAT, INDIA - 363630\nGST NO :- 24AATFV0318H1Z3\nMOB :-(+91)9712533336';
        mergedCellA3E8.alignment = { vertical: 'top', horizontal: 'left', wrapText: true };
        mergedCellA3E8.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };
        mergedCellA3E8.font = { bold: false, size: 18 };


        worksheet.mergeCells('F2:I2');
        const mergedCellF2I2 = worksheet.getCell('F2');
        mergedCellF2I2.value = {
            richText: [
                { text: 'PI NO.', font: { bold: false, size: 16 } },
                { text: 'AKK-321', font: { bold: true, size: 16 } },
            ]
        };

        mergedCellF2I2.alignment = { vertical: 'top', horizontal: 'left', wrapText: true };
        mergedCellF2I2.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };


        worksheet.mergeCells('F3:I3');
        const mergedCellF3I3 = worksheet.getCell('F3');
        mergedCellF3I3.value = {
            richText: [
                { text: 'DATE :-', font: { bold: false, size: 16 } },
                { text: dayjs(new Date()).format('DD.MM.YYYY'), font: { bold: true, size: 16 } },
            ]
        };

        mergedCellF3I3.alignment = { vertical: 'top', horizontal: 'left', wrapText: true };
        mergedCellF3I3.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };


        worksheet.mergeCells('F4:I4');
        const mergedCellF4I4 = worksheet.getCell('F4');
        mergedCellF4I4.value = 'IEC CODE :- AATFV0318H';
        mergedCellF4I4.value = {
            richText: [
                { text: 'IEC CODE :-', font: { bold: false, size: 16 } },
                { text: `AATFV0318H`, font: { bold: true, size: 16 } },
            ]
        };
        mergedCellF4I4.alignment = { vertical: 'top', horizontal: 'left', wrapText: true };
        mergedCellF4I4.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };


        worksheet.mergeCells('F5:I5');
        const mergedCellF5I5 = worksheet.getCell('F5');
        mergedCellF5I5.value = 'COUNTRY OF ORIGIN';
        mergedCellF5I5.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        mergedCellF5I5.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };
        mergedCellF5I5.font = { bold: true, size: 20 };


        worksheet.mergeCells('F6:I6');
        const mergedCellF6I6 = worksheet.getCell('F6');
        mergedCellF6I6.value = 'India';
        mergedCellF6I6.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        mergedCellF6I6.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };
        mergedCellF6I6.font = { bold: false, size: 18 };


        worksheet.mergeCells('F7:I7');
        const mergedCellF7I7 = worksheet.getCell('F7');
        mergedCellF7I7.value = 'PORT OF LOADING';
        mergedCellF7I7.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        mergedCellF7I7.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };
        mergedCellF7I7.font = { bold: true, size: 20 };


        worksheet.mergeCells('F8:I8');
        const mergedCellF8I8 = worksheet.getCell('F8');
        mergedCellF8I8.value = 'Mundra';
        mergedCellF8I8.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        mergedCellF8I8.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };
        mergedCellF8I8.font = { bold: false, size: 18 };


        worksheet.mergeCells('F9:I9');
        const mergedCellF9I9 = worksheet.getCell('F9');
        mergedCellF9I9.value = 'Carriage by:-';
        mergedCellF9I9.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        mergedCellF9I9.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };
        mergedCellF9I9.font = { bold: true, size: 20 };


        worksheet.mergeCells('F10:I10');
        const mergedCellF10I10 = worksheet.getCell('F10');
        mergedCellF10I10.value = 'SEA';
        mergedCellF10I10.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        mergedCellF10I10.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };
        mergedCellF10I10.font = { bold: false, size: 16 };


        worksheet.mergeCells('F11:O11');
        const mergedCellF11O11 = worksheet.getCell('F11');
        mergedCellF11O11.value = 'PAYMENT TERMS:-';
        mergedCellF11O11.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        mergedCellF11O11.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };
        mergedCellF11O11.font = { bold: true, size: 22 };


        worksheet.mergeCells('F12:O12');
        const mergedCellF12O12 = worksheet.getCell('F12');
        mergedCellF12O12.value = '30% Advanced and Balance Against original Documents';
        mergedCellF12O12.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        mergedCellF12O12.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };
        mergedCellF12O12.font = { bold: false, size: 18 };



        worksheet.mergeCells('F13:O13');
        const mergedCellF13O13 = worksheet.getCell('F13');
        mergedCellF13O13.value = 'LOADING AND PAYMENT CONDITION:-';
        mergedCellF13O13.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        mergedCellF13O13.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };
        mergedCellF13O13.font = { bold: true, size: 24 };


        worksheet.mergeCells('F14:O14');
        const mergedCellF14O14 = worksheet.getCell('F14');
        mergedCellF14O14.value = 'Shipment date: 20 DAYS LOAD AFTER CONFORMING ORDER ';
        mergedCellF14O14.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };
        mergedCellF14O14.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };
        mergedCellF14O14.font = { bold: false, size: 18 };


        worksheet.mergeCells('F15:O15');
        const mergedCellF15O15 = worksheet.getCell('F15');
        mergedCellF15O15.value = 'THIS PRICES ARE VALID TILL 6 DAYS FROM PROFORMA INVOICE DATE ';
        mergedCellF15O15.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };
        mergedCellF15O15.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };
        mergedCellF15O15.font = { bold: false, size: 18 };


        worksheet.mergeCells('J5:O5');
        const mergedCellJ5O5 = worksheet.getCell('J5');
        mergedCellJ5O5.value = 'COUNTRY OF DESTINATION';
        mergedCellJ5O5.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        mergedCellJ5O5.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };
        mergedCellJ5O5.font = { bold: true, size: 20 };

        worksheet.mergeCells('J6:O6');
        const mergedCellJ6O6 = worksheet.getCell('J6');
        mergedCellJ6O6.value = 'China';
        mergedCellJ6O6.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        mergedCellJ6O6.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };
        mergedCellJ6O6.font = { bold: false, size: 20 };


        worksheet.mergeCells('J7:O7');
        const mergedCellJ7O8 = worksheet.getCell('J7');
        mergedCellJ7O8.value = 'PORT OF DISCHARGE';
        mergedCellJ7O8.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        mergedCellJ7O8.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };
        mergedCellJ7O8.font = { bold: true, size: 20 };


        worksheet.mergeCells('J8:O8');
        const mergedCellJ8O8 = worksheet.getCell('J8');
        mergedCellJ8O8.value = 'Shenzhen';
        mergedCellJ8O8.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        mergedCellJ8O8.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };
        mergedCellJ8O8.font = { bold: false, size: 18 };



        worksheet.mergeCells('J9:O9');
        const mergedCellJ9O9 = worksheet.getCell('J9');
        mergedCellJ9O9.value = 'NO. OF CONTAINER';
        mergedCellJ9O9.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        mergedCellJ9O9.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };
        mergedCellJ9O9.font = { bold: true, size: 20 };


        worksheet.mergeCells('J10:O10');
        const mergedCellJ10O10 = worksheet.getCell('J10');
        mergedCellJ10O10.value = '5';
        mergedCellJ10O10.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        mergedCellJ10O10.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };

        // Set header values and style
        const headerValues = [
            'SL.',
            'PRODUCTION NO',
            'SAMPLE NO.',
            'NO. OF FACES',
            'FINISHING',
            'SIZE IN CM',
            'IMAGES',
            'NO. OF CONTAINER',
            'PALLETS',
            'BOX/PALLETS',
            'TOTAL BOX',
            'SQMTR/BOX',
            'TOTAL SQ. MTR',
            'FOB RATE/SQM (USD)',
            'TOTAL FOB AMOUNT (IN USD)'
        ];

        headerValues.forEach((value, index) => {
            const cell = worksheet.getCell(`${String.fromCharCode(65 + index)}16`);
            cell.value = value;
            cell.font = { bold: false, size: 14 };
            cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            }
        });

        const pI = await this.pIRepo.findById({ where: { id: piId }, select: ["metadata"] })
        Result.throwIfFailed(pI)

        const perfoma: PerformaInvoiceEntity = pI.data

        let row = 17
        let slNo = 1
        let totalNoOfContainer = 0
        let totalPallates = 0
        let totalBox = 0
        let totalSqMtr = 0
        perfoma.metadata?.forEach(entry => {
            // Check if noOfPallets length is 2
            const noOfPalletsLength = entry.noOfPallets?.length;
            let mergeCell = row + (noOfPalletsLength - 1);

            // Merge cells for each column
            ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'K', 'L', 'M', 'N', 'O'].forEach(col => {
                worksheet.mergeCells(`${col}${row}:${col}${mergeCell}`)
                const nnnCell = worksheet.getCell(`${col}${row}`)
                nnnCell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }

                }
                if (col === 'A') {
                    nnnCell.value = slNo++
                } else if (col === 'B') {
                    nnnCell.value = entry.productionNo
                } else if (col === 'C') {
                    nnnCell.value = entry.sampleNo
                } else if (col === 'D') {
                    nnnCell.value = entry.noOfFaces
                } else if (col === 'E') {
                    nnnCell.value = entry.finishing
                } else if (col === 'F') {
                    nnnCell.value = entry.sizeInCm
                } else if (col === 'G') {
                    nnnCell.value = 'images'
                } else if (col === 'H') {
                    nnnCell.value = entry.noOfContainer
                } else if (col === 'K') {
                    nnnCell.value = entry.totalBox
                } else if (col === 'L') {
                    nnnCell.value = entry.sqmtrBox
                } else if (col === 'M') {
                    nnnCell.value = entry.totalSqmtrBox
                } else if (col === 'N') {
                    nnnCell.value = entry.fobRate
                } else if (col === 'O') {
                    nnnCell.value = entry.totalFobAmount
                }
                nnnCell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
            });
            for (let a = 0; a < noOfPalletsLength; a++) {
                // Set values for cells I and J
                worksheet.getCell(`I${row + a}`).value = entry.noOfPallets[a].pallets;
                worksheet.getCell(`I${row + a}`).border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                }
                worksheet.getCell(`I${row + a}`).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };

                worksheet.getCell(`J${row + a}`).value = entry.noOfPallets[a].boxPerPallets;
                worksheet.getCell(`J${row + a}`).border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                }
                worksheet.getCell(`J${row + a}`).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
                totalPallates += entry.noOfPallets[a].pallets;
            }

            totalNoOfContainer += entry.noOfContainer
            totalBox += entry.totalBox
            totalSqMtr += Number(entry.totalSqmtrBox)

            row += (noOfPalletsLength);
        });


        let nextRow = row

        const cellH = worksheet.getCell(`H${row}`);
        cellH.value = totalNoOfContainer;
        cellH.alignment = { vertical: 'middle', horizontal: 'center' };
        cellH.font = { bold: true, size: 20 };
        cellH.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        }

        const cellI = worksheet.getCell(`I${nextRow}`);
        cellI.value = totalPallates;
        cellI.alignment = { vertical: 'middle', horizontal: 'center' };
        cellI.font = { bold: true, size: 20 };
        cellI.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        }

        const cellK = worksheet.getCell(`K${nextRow}`);
        cellK.value = totalBox;
        cellK.alignment = { vertical: 'middle', horizontal: 'center' };
        cellK.font = { bold: true, size: 20 };
        cellK.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        }

        const cellM = worksheet.getCell(`M${nextRow}`);
        cellM.value = totalSqMtr
        cellM.alignment = { vertical: 'middle', horizontal: 'center' };
        cellM.font = { bold: true, size: 20 };
        cellM.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        }

        const cello = worksheet.getCell(`O${nextRow}`);
        cello.value = 'T5';
        cello.alignment = { vertical: 'middle', horizontal: 'center' };
        cello.font = { bold: true, size: 20 };
        cello.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        }


        nextRow += 1
        worksheet.mergeCells(`A${nextRow}:G${nextRow}`);
        const mergeCellAAA = worksheet.getCell(`A${nextRow}`);
        mergeCellAAA.value = 'QUANTITY WILL BE + - 10% AT THE TIME OF PRODUCTION.';
        mergeCellAAA.alignment = { vertical: 'middle', horizontal: 'center' };
        mergeCellAAA.font = { bold: true, size: 20 };
        mergeCellAAA.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }

        }

        nextRow += 1
        worksheet.mergeCells(`A${nextRow}:I${nextRow}`);
        const mergeCellAAABBB = worksheet.getCell(`A${nextRow}`);
        mergeCellAAABBB.value = '';
        mergeCellAAABBB.alignment = { vertical: 'middle', horizontal: 'center' };
        mergeCellAAABBB.font = { bold: true, size: 20 };
        mergeCellAAABBB.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }

        }

        worksheet.mergeCells(`J${nextRow}:O${nextRow}`);
        const mergeCellAAAB = worksheet.getCell(`J${nextRow}`);
        mergeCellAAAB.value = '05X20 FCL FOB  IN USD    ';
        mergeCellAAAB.alignment = { vertical: 'middle', horizontal: 'center' };
        mergeCellAAAB.font = { bold: true, size: 20 };
        mergeCellAAAB.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }

        }

        nextRow += 1
        worksheet.mergeCells(`A${nextRow}:I${nextRow}`);
        const mergeCellA28 = worksheet.getCell(`A${nextRow}`);
        mergeCellA28.value = 'BANK DETAILS ';
        mergeCellA28.alignment = { vertical: 'middle', horizontal: 'center' };
        mergeCellA28.font = { bold: true, size: 20 };
        mergeCellA28.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        }

        worksheet.mergeCells(`J${nextRow}:O${nextRow}`);
        const vellozGranitoLLP = worksheet.getCell(`J${nextRow}`);
        vellozGranitoLLP.value = 'VELLOZA GRANITO LLP ';
        vellozGranitoLLP.alignment = { vertical: 'middle', horizontal: 'left' };
        vellozGranitoLLP.font = { bold: true, size: 20 };
        vellozGranitoLLP.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        }

        nextRow += 1
        worksheet.mergeCells(`A${nextRow}:I${nextRow}`);
        const mergeCellBeneficiary = worksheet.getCell(`A${nextRow}`);
        mergeCellBeneficiary.value = 'Beneficiary Bank Name: HDFC BANK LIMITED ';
        mergeCellBeneficiary.alignment = { vertical: 'middle', horizontal: 'left' };
        mergeCellBeneficiary.font = { bold: false, size: 16 };

        worksheet.mergeCells(`J${nextRow}:O${nextRow + 4}`);
        const vellozaImage = worksheet.getCell(`J${nextRow}`);
        vellozaImage.value = '';
        vellozaImage.alignment = { vertical: 'middle', horizontal: 'left' };
        vellozaImage.font = { bold: true, size: 20 };
        vellozaImage.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        }


        nextRow += 1
        worksheet.mergeCells(`A${nextRow}:I${nextRow}`);
        const bnameMerceCell = worksheet.getCell(`A${nextRow}`);
        bnameMerceCell.value = 'Beneficiary Name: VELLOZA GRANITO LLP ';
        bnameMerceCell.alignment = { vertical: 'middle', horizontal: 'left' };
        bnameMerceCell.font = { bold: false, size: 16 };

        nextRow += 1
        worksheet.mergeCells(`A${nextRow}:I${nextRow}`);
        const accntNo = worksheet.getCell(`A${nextRow}`);
        accntNo.value = 'Beneficiary Account No: 50200051991991 ';
        accntNo.alignment = { vertical: 'middle', horizontal: 'left' };
        accntNo.font = { bold: false, size: 16 };

        nextRow += 1
        worksheet.mergeCells(`A${nextRow}:I${nextRow}`);
        const switfCode = worksheet.getCell(`A${nextRow}`);
        switfCode.value = 'Swift Code: HDFCINBBXXX ';
        switfCode.alignment = { vertical: 'middle', horizontal: 'left' };
        switfCode.font = { bold: false, size: 16 };

        nextRow += 1
        worksheet.mergeCells(`A${nextRow}:I${nextRow}`);
        const bankAddress = worksheet.getCell(`A${nextRow}`);
        bankAddress.value = 'Bank Address: Rawapar Road, Morbi, Gujarat, India ';
        bankAddress.alignment = { vertical: 'middle', horizontal: 'left' };
        bankAddress.font = { bold: false, size: 16 };

        nextRow += 1
        worksheet.mergeCells(`A${nextRow}:I${nextRow}`);
        const corrsponseDtl = worksheet.getCell(`A${nextRow}`);
        corrsponseDtl.value = 'CORRESPONDENT BANK DETAILS ';
        corrsponseDtl.alignment = { vertical: 'middle', horizontal: 'center' };
        corrsponseDtl.font = { bold: true, size: 16 };
        corrsponseDtl.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        }

        worksheet.mergeCells(`J${nextRow}:O${nextRow}`);
        const authorizedSign = worksheet.getCell(`J${nextRow}`);
        authorizedSign.value = 'AUTHORIZED SIGNATORY ';
        authorizedSign.alignment = { vertical: 'middle', horizontal: 'left' };
        authorizedSign.font = { bold: true, size: 16 };
        authorizedSign.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        }

        nextRow += 1
        worksheet.mergeCells(`A${nextRow}:I${nextRow}`);
        const corrBankNmae = worksheet.getCell(`A${nextRow}`);
        corrBankNmae.value = 'Bank Name - JPMorgan Chase Bank, New York. ';
        corrBankNmae.alignment = { vertical: 'middle', horizontal: 'left' };
        corrBankNmae.font = { bold: false, size: 16 }


        worksheet.mergeCells(`J${nextRow}:O${nextRow}`);
        const buyersign = worksheet.getCell(`J${nextRow}`);
        buyersign.value = 'BUYER SIGN AND STUMP';
        buyersign.alignment = { vertical: 'middle', horizontal: 'left' };
        buyersign.font = { bold: true, size: 16 }
        buyersign.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        }


        nextRow += 1
        worksheet.mergeCells(`A${nextRow}:I${nextRow}`);
        const coorsAccNo = worksheet.getCell(`A${nextRow}`);
        coorsAccNo.value = 'A/c No. - 001 - 1 - 406717 ';
        coorsAccNo.alignment = { vertical: 'middle', horizontal: 'left' };
        coorsAccNo.font = { bold: false, size: 16 }

        worksheet.mergeCells(`J${nextRow}:O${nextRow + 4}`);
        const buyerSignedImage = worksheet.getCell(`J${nextRow}`);
        buyerSignedImage.value = '';
        buyerSignedImage.alignment = { vertical: 'middle', horizontal: 'left' };
        buyerSignedImage.font = { bold: true, size: 20 };
        buyerSignedImage.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        }


        nextRow += 1
        worksheet.mergeCells(`A${nextRow}:I${nextRow}`);
        const corrs_SwitfCode = worksheet.getCell(`A${nextRow}`);
        corrs_SwitfCode.value = 'Swift Code - CHASUS33 ';
        corrs_SwitfCode.alignment = { vertical: 'middle', horizontal: 'left' };
        corrs_SwitfCode.font = { bold: false, size: 16 }

        nextRow += 1
        worksheet.mergeCells(`A${nextRow}:I${nextRow}`);
        const corrs_fed_code = worksheet.getCell(`A${nextRow}`);
        corrs_fed_code.value = 'Fed Wire Code - FEDWIRE ABA: 021000021 ';
        corrs_fed_code.alignment = { vertical: 'middle', horizontal: 'left' };
        corrs_fed_code.font = { bold: false, size: 16 }

        nextRow += 1
        worksheet.mergeCells(`A${nextRow}:I${nextRow}`);
        const corrs_chips = worksheet.getCell(`A${nextRow}`);
        corrs_chips.value = 'CHIPS ABA - CHIPS ABA: 0002 ';
        corrs_chips.alignment = { vertical: 'middle', horizontal: 'left' };
        corrs_chips.font = { bold: false, size: 16 }

        nextRow += 1
        worksheet.mergeCells(`A${nextRow}:I${nextRow}`);
        const coorsUidNo = worksheet.getCell(`A${nextRow}`);
        coorsUidNo.value = 'CHIPS UID NO. - CHIPS UID#354459	';
        coorsUidNo.alignment = { vertical: 'middle', horizontal: 'left' };
        coorsUidNo.font = { bold: false, size: 16 }


        nextRow += 1
        worksheet.mergeCells(`A${nextRow}:O${nextRow}`);
        const allGoods = worksheet.getCell(`A${nextRow}`);
        allGoods.value = 'ALL GOODS ARE INDIAN ORIGIN ';
        allGoods.alignment = { vertical: 'middle', horizontal: 'center' };
        allGoods.font = { bold: true, size: 20 }
        allGoods.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFAAAAAA' }
        };


        const buffer = await workbook.xlsx.writeBuffer();

        // Upload buffer to S3 bucket
        /* const uploadParams = {
            Bucket: 'general-purpose-tiles',
            Key: 'image_in_cells.xlsx',
            Body: buffer,
            ContentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        };
        await this.s3Service.uploadToS3(uploadParams)
 */

        const filePath = 'output.xlsx';
        // Write the buffer to a local file
        fs.writeFile(filePath, buffer, err => {
            if (err) {
                console.error('Error occurred while saving the file:', err);
            } else {
                console.log('File saved successfully.');
            }
        });

        // Save the workbook
        return Result.success("done");
    }

    public async createPdfFromImages() {

        const outputPDF = 'ImagesFromS3_Output.pdf';
        const pdfStream = fs.createWriteStream(outputPDF);

        // Configuration
        const { base64Image } = await this.s3Service.s3UrlToBuffer('s3://general-purpose-tiles/images/083881d1-3eec-4f44-bfaa-c0de12c3fca3/DSC05115.JPG')

        const pdfDoc = new PDFDocument({ size: [612, 792] });
        pdfDoc.pipe(pdfStream);

        pdfDoc.image(base64Image);

        pdfDoc.addPage();
        pdfDoc.end();
    }
}