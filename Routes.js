const express = require('express')
const router = express.Router()

router.use((req, res, next) => {
    console.log('sending to route....')
    next()
})

router.use('/user', require('./Controllers/User.Controller'))

module.exports = router