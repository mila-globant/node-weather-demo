const path = require(('path'))
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// define paths for express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// set up satatis dir
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Mila'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Mila'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Mila',
        message: 'If you need help, please contact us'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'help article not found',
        name: 'Mila'
    })
})


/* res.send(path.join(publicDir, 'help.html'))
res.send(path.join(publicDir, 'about.html'))
 */


/* 
app.get('', (req, res) => {
    res.send('<h1>Weather</h1>')
})
app.get('/help', (req, res) => {
    res.send({
        name: 'Happy',
        age: 25
    })
})

app.get('/about', (req, res) => {
    res.send('<h2>About page!</h2>')
})
 */

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            error: 'Missing address'
        })
    }

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            return res.send({
                forecast: forecastData,
                location: location,
                address: address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'My 404 page',
        name: 'Mila'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000');
})

