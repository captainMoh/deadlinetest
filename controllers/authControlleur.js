const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { User } = require('../model/user');

const mail = async (user) => {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASSWORD
        }
    })

    let info = await transporter.sendMail({
        from: 'aichoun026@gmail.com',
        to: `aichoun026@gmail.com, ${user.Email}`,
        subject: "Création de compte sur Deadline BTP",
        text: 
        `
        Félicitations ${user.Prenom}, vous venez de finaliser l'inscription chez Deadline BTP.
        Je vous souhaite la bienvenue, cliquez sur le lien ci-dessous pour vous connecter:
        https://deadlinetest.herokuapp.com/
        `
        
    });
}

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
                .then(() => {
                    res.status(201).send({message: 'Utilisateur créer'})
                })
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