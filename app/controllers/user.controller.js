const User = require("../models/user.model");
const mongoose = require("mongoose");
const Coinpayments = require('coinpayments');
const client = new Coinpayments({ key: "ccbe60f1b4deb695d416287188170e0721dbb6a91485ca704b9a9fc2912f8dde", secret: "889c35Cf103468Cbd4C54f596640775987a5c7af8900d964d909C2c118560a4b" })
exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};


exports.updateProfile = (req, res) => {
    let id = req.body.id;
    let conditions = {
        _id: id
    }

    var update = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        picture: req.body.picture,
        birthday: req.body.birthday,
        address1: req.body.address1,
        address2: req.body.address2,
        telephone: req.body.telephone,
        postcode: req.body.postcode,
        region: req.body.region,
        country: req.body.country
    }
    User.findOneAndUpdate(conditions, update, function(error, result) {
        if (error) {
            res.status(200).send({ message: "error" });
        } else {
            res.status(200).send({ message: "user updated successfully" });
        }
    });
};

exports.addKyc = (req, res) => {
    let id = req.body.id;
    let conditions = {
        _id: id
    }

    var updateProfile = {
        kyc: {
            image: req.body.kyc,
            status: "pending"
        }
    }
    User.findOneAndUpdate(conditions, updateProfile, function(error, result) {
        if (error) {
            res.status(200).send({ message: "error" });
        } else {
            res.status(200).send({ message: "kyc added successfully" });
        }
    });
};
exports.getUser = (req, res) => {
    let id = req.params.id;
    let conditions = {
        _id: id
    }

    User.findOne(conditions, function(error, user) {
        if (error) {
            res.status(200).send({ message: "error" });
        } else {
            res.status(200).send({ user });
        }
    });
};

exports.addBalance = (req, res) => {
    let conditions = {
        _id: req.body.id
    }

    var crypto = req.body.crypto;
    User.findOneAndUpdate(conditions, { $push: { crypto } }, function(error, result) {
        if (error) {
            res.status(200).send({ message: "error", error });
        } else {
            res.status(200).send({ message: "user updated successfully" });
        }
    });

};

exports.balanceCoinPaiement = async(req, res) => {
    let info = await client.balances({ all: 0 })
    res.status(200).send({ info });
};

exports.addressCoinPaiement = async(req, res) => {
    let info = await client.getDepositAddress({ currency: 'LTCT' })
    res.status(200).send({ info });
};

exports.createTransactionCoinPaiement = async(req, res) => {
    let info = await client.createTransaction({
        currency1: 'LTCT',
        currency2: 'LTCT',
        address: 'myfmAYXY7pDDbYJJEyyEWwKqQGy5ibZw7D',
        amount: 1,
        buyer_email: 'mohamedbekir04@gmail.com'
    })
    res.status(200).send({ info });
};