export default function makeHttpResponse({ statusCode, data } : { statusCode: number, data: any }){
    return {
        headers: {
            "Content-type": "application/json",
        },
        statusCode,
        data: data
    }
}