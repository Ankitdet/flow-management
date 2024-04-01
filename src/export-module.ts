import { CrudModule } from "./common-infra/base.module";
import { ProductModule } from "./routes/product/product.module";


export const GlobleModules = [
    CrudModule,
]

export const AllModules = [
    ...GlobleModules,
    ProductModule,
]