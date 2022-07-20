const request = require('postman-request')


const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibWlsYS1nbG9iYW50IiwiYSI6ImNsNXB2aW9scDB1ZWwzY3BjaXFmYzI5M2IifQ.rtsFZXD0TOiX3ZjiD_1x0A&limit=1`

    request(url, { json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to api', undefined)
        } else if (body.message === 'Not Authorized - No Token' || body.features.length < 1) {
            callback('Unable to find. Try another search', undefined)
        } else {
            const info = body.features[0]
            callback(
                undefined,
                {
                    latitude: info.center[1],
                    longitude: info.center[0],
                    location: info.place_name
                }
            )
        }
    })
}

module.exports = geocode