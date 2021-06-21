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

async function doRegister(req, res, next) {

    const body = req.body;
    const username = body.username;
    const password = body.password;
    const email = body.email;

    if (!username)
        return res.status(400).send({
            message: 'Please enter a username'
        })

    if (!password)
        return res.status(400).send({
            message: 'Please enter a password'
        })

    if (!email)
        return res.status(400).send({
            message: 'Please enter an email'
        })

    if(await findOne(['username', username]))
        return res.status(400).send({
            message: 'Username already exists.'
        })

    if(await findOne(['email', email]))
        return res.status(400).send({
            message: 'That email is already registered.'
        })

    let values = [username, password, email]
    connect.query('insert into users values (null, ?, ?, ?)', values, (error, result) => {
        if (error)
            throw error;
    })

    next()
}

const findOne = (params) => {
    return new Promise((resolve) => {
        connect.query(`select * from users where ${params[0]} = '${params[1]}'`, (error, result) => {
            if (error)
                throw error;

            resolve(result.length > 0)
        })
    })
}