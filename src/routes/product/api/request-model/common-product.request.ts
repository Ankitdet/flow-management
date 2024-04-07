import { DeepPartial } from "typeorm";
import { RequestEnum } from "../../../../core-common/enum/request.enum";
import { CommonError } from "../../../../core-common/common-error";
import { Result } from "../../../../core-common/result-model";

export class CommonProductRequest {
    id: string;
    productionNo: string;
    sampleNo: string;
    finishing: string[];
    surface: string[];
    face: string[];
    size: string[];
    folderId: string

    constructor(data: DeepPartial<{
        id: string;
        productionNo: string;
        sampleNo: string;
        finishing: string[];
        surface: string[];
        face: string[];
        size: string[];
        folderId: string
    }>, operation: string) {

        // mapp fields here.
        this.productionNo = data.productionNo || '';
        this.sampleNo = data.sampleNo || '';
        this.finishing = data.finishing || [];
        this.surface = data.surface || [];
        this.face = data.face || [];
        this.size = data.size || []
        this.folderId = data.folderId || ''
        this.id = data.id

        let result = []
        if (operation === RequestEnum.CREATE) {
            // Delete ID as not needed on creation part.
            delete this.id
            if (!this.productionNo) {
                result.push(`productionNo must be required.`)
            }

            if (!this.sampleNo) {
                result.push(`sampleNo must be required.`)
            }

            if (!this.finishing) {
                result.push(`productionNo must be required.`)
            }
        }

        if (operation === RequestEnum.UPDATE) {
            if (!this.id) {
                result.push(`Id must be required.`)
            }
        }

        if (operation === RequestEnum.DELETE) {
            if (!this.id) {
                result.push(`Id must be required.`)
            }
        }

        if (result.length > 0) {
            const failed = Result.failed(new CommonError(`Validation Error`, result, 400))
            Result.throwIfFailed(failed)
        }

    }
}