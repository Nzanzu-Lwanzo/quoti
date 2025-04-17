import { FilterComparisonOptions } from "./@types";

export function getFilterOptionsByPublishYear(comparisonValue: number | undefined, filterOption?: FilterComparisonOptions) {

    // <comparisonValue> is mandatory
    if (!comparisonValue) return

    switch (filterOption) {
        case "gt": {
            return { gte: comparisonValue }
        }

        case "lt": {
            return { lte: comparisonValue }
        }

        case "eq": {
            return { equals: comparisonValue }
        }

        default: {
            return {} // If they don't provide the comparison hint, just don't filter
        }
    }
}