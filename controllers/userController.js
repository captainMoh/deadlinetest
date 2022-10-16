const { User } = require('../model/user');
const ObjectID = require('mongoose').Types.ObjectId;

// exports.getAllUsers = (req, res) => {
//     User.find({}).select('-Mdp')
//         .then(docs => res.send(docs))
//         .catch(error => res.status(500).send(`erreur: ${error}`))
// }

exports.getOneUser = (req, res) => {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send(`ID unknown: ${req.params.id}`)

    User.findById(req.params.id).select('-Mdp')
        .then(docs => res.send(docs))
        .catch(error => res.status(500).send(`erreur: ${error}`))
}

exports.modifUser = (req, res) => {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send(`ID unknown: ${req.params.id}`)

    const Modif = {
        Adresse: req.body.adresse,
        Email: req.body.email,
        Cp: req.body.cp,
        Ville: req.body.ville
    }

    User.findByIdAndUpdate(
        req.params.id,
        { $set: Modif },
        { new: true, upsert: true }
    ).select('-Mdp')
    .then(docs => res.send(docs))
    .catch(error => res.status(500).send(`erreur: ${error}`))
}

exports.deleteUser = (req, res) => {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send(`ID unknown: ${req.params.id}`)

    User.findByIdAndRemove(req.params.id).select('-Mdp')
        .then(docs => res.send(docs))
        .catch(error => res.status(500).send(`erreur: ${error}`))
}