import { ArgumentsHost, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host'
import { Response } from 'express'
import { handleResponse } from '../interceptor/response-handler'
import { HttpResponseFormatter } from '../utils/http-response-formatter'
import { Result } from '../../core-common/result-model'
import { CustomValidationError } from '../../core-common/errors/custom-validation-error'

export class GlobalExceptionFilter implements ExceptionFilter {
    public statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR
    public message: any = 'Internal Server Error'
    catch(exception: any, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse<Response>()
        if (exception instanceof TypeError) {
            console.error(exception)
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(`Type Error ${JSON.stringify(exception)}`)
        }

        if (exception instanceof Result) {
            const request = host.switchToHttp().getRequest()
            const executionContext = new ExecutionContextHost([request, response])
            const failedResponse = handleResponse(executionContext, exception)
            if (failedResponse) {
                return response.status(failedResponse.statusCode).json(failedResponse)
            }
        }

        let message = exception.message
        if (exception?.isResult && !exception?.success) {
            message = 'Something bad happened, please reachout to the team !!!'
        }

        this, (this.statusCode = exception?.status || HttpStatus.INTERNAL_SERVER_ERROR)
        this.message = message

        if (this.isErrorFromValidatonPipe(exception)) {
            this.setResponseDetailsForValidationError(exception, response)
            return
        }
        const jsonObj = {
            statusCode: this.statusCode,
            success: false,
            message: this.message,
        }

        response.status(this.statusCode).json(jsonObj)
    }

    private isErrorFromValidatonPipe(exception: any): boolean {
        const validationpipe = 'ValidationPipe'
        return this.statusCode === HttpStatus.BAD_REQUEST &&
            exception instanceof HttpException &&
            exception.stack?.includes(validationpipe)
            ? true
            : false
    }

    private setResponseDetailsForValidationError(exception: HttpException, response: Response): void {
        const validationMessage = exception.getResponse()

        const validationError = new CustomValidationError(validationMessage)

        // Delete additional non required property from the Error response code.
        delete validationError.validationError.error
        delete validationError.validationError.statusCode
        validationError.validationError.message = validationError?.validationError?.message?.filter(
            (a: any) => a !== undefined,
        )

        response.status(HttpStatus.BAD_REQUEST)

        const apiError = new HttpResponseFormatter().getStandardApiResponse(
            HttpStatus.BAD_GATEWAY,
            Result.failed(validationError),
        )

        response.send(apiError)
    }
}
