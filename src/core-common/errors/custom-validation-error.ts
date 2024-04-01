import { HttpStatus } from '@nestjs/common'
import { CommonError } from '../common-error'

export class CustomValidationError extends CommonError {
    constructor(public validationError: any) {
        super('ValidationError', 'There are an issues found in input provided.', HttpStatus.BAD_REQUEST)
    }
}
