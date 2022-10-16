const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../model/user');

exports.signUp = (req, res) => {
    bcrypt.hash(req.body.mdp, 10)
        .then(hash => {
            const user = new User({
                Pseudo: req.body.pseudo,
                Mdp: hash,
                Nom: req.body.nom,
                Prenom: req.body.prenom,
                Adresse: req.body.adresse,
                Cp: req.body.cp,
                Ville: req.body.ville,
                Email: req.body.email,
                Telephone: req.body.telephone
            })
            user.save()
                .then(() => res.status(201).send({message: 'Utilisateur créer'}))
                .catch(error => res.status(400).send(`Ce pseudo ou cet email est déja existant`))
        })
        .catch(error => res.status(400).send(`Une erreur hash est survenue ${error}`))
}

exports.login = (req, res) => {
    User.findOne({$or:[{Email: req.body.identifiant }, {Pseudo: req.body.identifiant}]})
        .then(user => {
            if(!user)
                return res.status(401).send({error: 'Mot de passe ou utilisateur incorrect'})
            bcrypt.compare(req.body.mdp, user.Mdp)
                .then(valid => {
                    if(!valid)
                        return res.status(401).send({error: 'Mot de passe ou utilisateur incorrect'})

                    res.status(200).send({
                        userId: user._id,
                        token: jwt.sign(
                            {userId: user._id},
                            process.env.SECRET_TOKEN,
                            {expiresIn: '24h'} 
                        ),
                        refreshToken: jwt.sign(
                            {userId: user._id},
                            process.env.REFRESH_TOKEN,
                            {expiresIn: '24h'} 
                        )
                    })
                })
                .catch(error => res.status(500).send({error}))
        })
        .catch(error => res.status(500).send(`Une erreur ${error}`))
}