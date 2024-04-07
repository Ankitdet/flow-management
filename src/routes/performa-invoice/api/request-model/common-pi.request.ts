import { DeepPartial } from '../../../../core-common/deep-partial';
import { RequestEnum } from '../../../../core-common/enum/request.enum';
import { PerformaInvoiceEntity } from '../../../../entity';

export class CommonPIRequest extends PerformaInvoiceEntity {
    constructor(data: DeepPartial<PerformaInvoiceEntity>, operation: string) {
        super(data)
        if (operation === RequestEnum.CREATE) {
            delete this.id
        }
    }
}
