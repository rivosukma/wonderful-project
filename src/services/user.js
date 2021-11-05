import ApiRequest, { defaultHeaders } from "./request"

const ApiUrl = process.env.REACT_APP_API_URL

export const getUserList = async( queryStr) => {
    const { data, error } = await ApiRequest.fetch(
        ApiUrl,
        defaultHeaders,
        queryStr
    )
    if(error) return { response: [], status: 500, error }
    return {
        response: data?.results || [],
        status: 200
    }
}