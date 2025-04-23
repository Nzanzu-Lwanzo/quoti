export function getErrorResponseShape(code: number) {
    return {
        message: "string",
        error: "string",
        statusCode: code
    }
}