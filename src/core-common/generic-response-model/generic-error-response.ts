import { Result } from '../result-model'

export class GenericErrorResponse {
    public statusCode: number
    public success: boolean
    public status: number
    public error: any
    public reqId: string

    initilize(result: Result<any>, statusCode?: number) {
        this.statusCode = statusCode
        this.error = result.error
        this.success = result.success
    }
}
