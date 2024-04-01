import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common'
import { ServerResponse } from 'http'
import { Observable, map } from 'rxjs'
import { HttpResponseFormatter } from '../utils/http-response-formatter'
import { v4 as uuidv4 } from 'uuid'
import { GenericSuccessResponse } from '../../core-common/generic-response-model/generic-success-response'
import { GenericErrorResponse } from '../../core-common/generic-response-model/generic-error-response'

export class ResponseHandlerInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const req = context.switchToHttp().getRequest()

        const reqId = uuidv4()
        const { body, query, method, originalUrl } = req
        const reqObj = {
            method,
            originalUrl,
            body,
            query,
            reqId,
        }
        console.log(`Incoming Request: ${JSON.stringify(reqObj, null, 2)}`)
        return next.handle().pipe(map(data => handleResponse(context, data, reqId)))
    }
}

export function handleResponse(
    context: ExecutionContext,
    responseData: any,
    reqId?: string,
): GenericSuccessResponse<any> | GenericErrorResponse {
    let serverResponse = context.switchToHttp().getResponse<ServerResponse>()
    let apiResponse: any = new HttpResponseFormatter().getStandardApiResponse(serverResponse.statusCode, responseData)
    serverResponse.statusCode = apiResponse.statusCode ? apiResponse.statusCode : apiResponse?.error?.statusCode

    // In Error Case only.
    if (!apiResponse.statusCode) {
        apiResponse.statusCode = apiResponse?.error?.statusCode
        delete apiResponse?.error?.statusCode
    }
    if (reqId) {
        apiResponse.reqId = reqId
    } else {
        apiResponse.reqId = uuidv4()
    }
    return apiResponse
}
