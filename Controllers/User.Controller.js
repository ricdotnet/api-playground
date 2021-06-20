const express = require('express')
const route = express.Router()
const verifyToken = require('../Auth/verifyToken')

const connect = require('../mysql')

module.exports = route

route.post('/login', verifyToken, doLogin, (req, res) => {
    res.status(200).send(req.response)
})
route.post('/register', doRegister, (req, res) => {
    res.sendStatus(200)
})

function doLogin(req, res, next) {

    //if the token is not correct send a Forbidden message
    if(req.bearerToken !== process.env.BEARER)
        return res.sendStatus(403)

    //define a response body
    const response = {
        name: 'Ricardo',
        surname: 'Rocha'
    }

    //send the response body
    req.response = response;
    next()
}

function doRegister(req, res, next) {

    const body = req.body;
    const username = body.username;
    const password = body.password;
    const email = body.email;

    if(!username)
        return res.status(400).send({
            message: 'Please enter a username'
        })

    if(!password)
        return res.status(400).send({
            message: 'Please enter a password'
        })

    if(!email)
        return res.status(400).send({
            message: 'Please enter an email'
        })

    let values = [username, password, email]
    connect.query('insert into users values (null, ?, ?, ?)', values, (error, result) => {
        if(error)
            throw error;

        console.log(result)
    })

    next()
}