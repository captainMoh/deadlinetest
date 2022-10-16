const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token) return res.status(401).send('error token');

        jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
            if(err) return res.status(401).send(`authentification erreur: ${err}`)
            next();
        }) 
    } catch (error) {
        res.status(401).json({ error: error | 'Requete non authentifié' })
    }       

}