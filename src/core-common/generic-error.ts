import { HttpStatus } from '@nestjs/common'

const isStringified = (str: any) => {
    try {
        return JSON.parse(str)
    } catch (err) {
        return str
    }
}

export class GenericError {
    public message: string
    public statusCode: HttpStatus
    public detail: string

    constructor(message: string, detail: any, statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR) {
        this.message = isStringified(message)
        this.detail = JSON.stringify(detail, null, 2)
        this.statusCode = statusCode
    }
}
