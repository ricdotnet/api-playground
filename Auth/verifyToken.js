function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization']

    //if no bearer header is set
    if(!bearerHeader)
        return res.sendStatus(401)

    //get the token, split and set it to token var
    let token = bearerHeader.split(' ')
    token = token[1]

    //if the token is empty
    if(token === 'undefined' || !token)
        return res.sendStatus(401)

    //set the bearer token var and go forward
    req.bearerToken = token;
    next()
}

module.exports = verifyToken;