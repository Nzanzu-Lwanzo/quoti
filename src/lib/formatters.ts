export function formatResponseData<T>(data: T): {
    data: T;
    timestamps: number
} {

    const response = {
        data,
        timestamps: Date.now()
    }

    return response
}