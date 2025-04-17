export type FilterComparisonOptions = "gt" | "lt" | "eq"


export type FilterBooksOptionsType = {
    limit: number;
    publishYear: number;
    publishingHouse: string;
    publishingTown: string;
    edition: string;
    pyc: FilterComparisonOptions
}