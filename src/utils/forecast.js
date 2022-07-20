const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=1b541ca1bc96a09ffad17b088b999ee8&query=${latitude},${longitude}&units=f`

    request(url, { json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const info = body.current
            callback(undefined, `${info.weather_descriptions[0]}. It is currently ${info.temperature} degrees out. It feels like ${info.feelslike} degrees out.`)
        }
    })
}

module.exports = forecast
