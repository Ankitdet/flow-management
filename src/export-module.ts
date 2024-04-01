import { CrudModule } from "./common-infra/base.module";
import { UserModule } from "./routes/user/user.module";

export const AllModules = [
    CrudModule,
    UserModule,
]