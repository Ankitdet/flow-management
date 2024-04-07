import { In } from "typeorm";

export class ListProductRequest {
    constructor(
        public finishing?: string[],
        public productionNo?: string[]
    ) {
    }
    public static buildWhereCondition(query: ListProductRequest): any {
        const whereCondition: any = {};
        if (query.finishing) {
            whereCondition['finishing'] = In([query['finishing']]);
        }
        return whereCondition;
    }
}