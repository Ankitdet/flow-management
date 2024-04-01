import { HttpStatus } from '@nestjs/common'
import { GenericError } from '../generic-error'

export class CustomValidationError extends GenericError {
    constructor(public validationError: any) {
        super('ValidationError', 'There are an issues found in input provided.', HttpStatus.BAD_REQUEST)
    }
}
