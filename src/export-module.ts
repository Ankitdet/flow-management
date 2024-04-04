import { BaseModule } from "./common-infra/base.module";
import { PerformaInvoiceModule } from "./routes/performa-invoice/performa-invoice.module";
import { ProductModule } from "./routes/product/product.module";


export const GlobleModules = [
    BaseModule,
]

export const AllModules = [
    ...GlobleModules,
    ProductModule,
    PerformaInvoiceModule
]