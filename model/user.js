const mongoose = require('mongoose');
const { stringify } = require('querystring');

const user = new mongoose.Schema({
    Pseudo: {
        type: String,
        required: true,
        unique: true
    },
    Mdp: {
        type: String,
        required: true
    },
    Nom: {
        type: String,
        required:true
    },
    Prenom: {
        type: String,
        required: true
    },
    Adresse: {
        type: String,
        required: true
    },
    Cp: {
        type: String,
        required: true
    },
    Ville: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Telephone: {
        type: String,
        required: true
    }

})


module.exports.User = mongoose.model('user', user);