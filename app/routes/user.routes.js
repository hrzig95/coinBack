const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/test/all", controller.allAccess);

    app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

    app.get(
        "/api/test/mod", [authJwt.verifyToken, authJwt.isModerator],
        controller.moderatorBoard
    );

    app.get(
        "/api/test/admin", [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );

    app.post("/updateProfile", controller.updateProfile);
    app.get("/getUser/:id", controller.getUser);
    app.post("/addBalance", controller.addBalance);

    app.post("/addKyc", controller.addKyc);
    app.get("/balanceCoinPaiement", controller.balanceCoinPaiement);
    app.get("/addressCoinPaiement", controller.addressCoinPaiement);
    app.post("/createTransactionCoinPaiement", controller.createTransactionCoinPaiement);


};