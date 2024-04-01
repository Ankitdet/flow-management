export class ListQuery<T> {
    constructor(
        public query: T,
        public offset: number,
        public limit: number,
        public sortColumn: string,
        public sortDirection: 'Asc' | 'Desc'
    ) {
        if (isNaN(this.limit)) this.limit = 10
        if (isNaN(this.offset)) {
            this.offset = 0
        } else {
            if (this.offset <= 1) {
                this.offset = 0
            } else {
                this.offset = (this.offset - 1) * this.limit
            }
        }

        if (!this.sortColumn) {
            this.sortColumn = 'createdAt'
        }
        if (!this.sortDirection) {
            this.sortDirection = 'Desc'
        }
    }
}