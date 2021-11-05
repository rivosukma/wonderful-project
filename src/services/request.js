export const defaultHeaders = {
    headers: {
        'Content-Type': 'application/json'
    }
}

class ApiRequest {
    static resolveParams(params) {
        const paramsResult = [];
        Object.keys(params).map(e => paramsResult.push(`${e}=${params[e]}`));
        return paramsResult.join('&');
    }

    static async fetch(url, options, queryStr) {
        try {
            const params = (
                queryStr
                ? `?${this.resolveParams(queryStr)}`
                : ''
            )
            const response = await fetch(url + params, {
                ...options,
            });
            return {
                data: await response.json(),
                error: null,
            };
        } catch (e) {
            return {
                data: null,
                error: e,
            };
        }
    }
}
export default ApiRequest