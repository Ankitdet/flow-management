import { HttpStatus } from '@nestjs/common'

const stringified = (str: any) => {
    try {
        return JSON.parse(str)
    } catch (err) {
        if (str instanceof Array) {
            return str
        }
        return JSON.stringify(str)
    }
}
export class CommonError {
    public message: string
    public statusCode: HttpStatus
    public detail: string

    constructor(message: string, detail: any, statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR) {
        this.message = message
        this.detail = stringified(detail)
        this.statusCode = statusCode
    }
}
