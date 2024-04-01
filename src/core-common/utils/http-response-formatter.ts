import { HttpStatus } from '@nestjs/common'
import { NotFoundError } from 'rxjs'
import { GenericErrorResponse } from '../generic-response-model/generic-error-response'
import { GenericSuccessResponse } from '../generic-response-model/generic-success-response'
import { Result } from '../result-model'
import { CommonError } from '../common-error'

export class HttpResponseFormatter {
    public getStandardApiResponse(
        statusCode: HttpStatus,
        responseData: any,
    ): GenericSuccessResponse<any> | GenericErrorResponse {
        if (this.isSuccessResult(responseData)) {
            return this.getSuccessResponse(responseData, statusCode)
        }

        if (this.isFailedResult(responseData)) {
            return this.getFailedResponse(responseData)
        }
    }

    private getSuccessResponse(responseData: any, statusCode: HttpStatus): GenericSuccessResponse<any> {
        const apiSuccess = new GenericSuccessResponse()
        apiSuccess.initilize(responseData, statusCode)
        return apiSuccess
    }

    private isSuccessResult(responseData: any): boolean {
        return responseData instanceof Result && responseData.success
    }
    private isFailedResult(responseData: any): boolean {
        return responseData instanceof Result && !responseData.success
    }

    private getFailedResponse(result: Result<any>): GenericErrorResponse {
        const errorResponse = new GenericErrorResponse()

        const statusCode = this.getStatusCode(result.error)
        errorResponse.initilize(result, statusCode)
        return errorResponse
    }

    private getStatusCode(error: CommonError): HttpStatus {
        if (error instanceof NotFoundError) {
            return HttpStatus.NOT_FOUND
        }
    }
}
