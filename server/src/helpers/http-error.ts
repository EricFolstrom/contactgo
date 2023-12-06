export default function makeHttpError({ statusCode, errorMessage } : { statusCode: number, errorMessage: string }){
    return {
        headers: {
            "Content-type": "application/json",
        },
        statusCode,
        data: {
            success: false,
            error: errorMessage
        }
    }
}