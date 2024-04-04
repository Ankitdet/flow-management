import { CommonError } from "../../../core-common/common-error";

export class PreSignedUrlGenerationError extends CommonError {
    constructor(key: string) {
        super('PreSignedUrlGenerationError', 'Failed to generate Pre Signed Url for Key: ' + key)
    }
}
