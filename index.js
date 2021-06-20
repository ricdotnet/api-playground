const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const bodyParser = require('body-parser')
const routes = require('./Routes')

const connect = require('./mysql')

require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//main routes
app.use('/', routes)

connect.connect((error) => {
    if(error)
        throw error;

    console.log('Connected to the db.')
    server.listen(process.env.SERVER_PORT, () => {
        console.log('server running on: ' + process.env.WEBSITE_URL + ':' + process.env.SERVER_PORT)
    })
})
