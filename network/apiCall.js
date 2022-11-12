
export const BASE_URL = 'https://saloon-ibra-api.herokuapp.com/api/'

const serialize = function (obj) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return '?' + str.join("&");
}


export const apiCall = async (url, method = 'GET', body, queryParams) => {
    const customURL = queryParams ? BASE_URL + url + serialize(queryParams) : BASE_URL + url

    const result = await fetch(BASE_URL + url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzE3YjZkZWQ0MTdlNGNiZmZkZTRkYTUiLCJpYXQiOjE2NjgyODU3NzEsImV4cCI6MTY2ODg5MDU3MX0.TBpzv6zfOigaWjtSfXgv0viZRkca-tnJx7Lkf1idOW4`
        },
        method: method,
        body: body ? JSON.stringify(body) : null
    })
    const json = await result.json()
    return json
}
