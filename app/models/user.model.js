const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const User = mongoose.model(
    "User",
    new mongoose.Schema({
        email: String,
        password: String,
        firstName: String,
        lastName: String,
        birthday: Date,
        picture: String,
        kyc: { image: String, status: String },
        country: String,
        region: String,
        address1: String,
        address2: String,
        postcode: String,
        telephone: String,
        crypto: [{ name: String, quantite: Number }]
    })
);

module.exports = User;