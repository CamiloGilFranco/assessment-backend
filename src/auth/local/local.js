const { Router } = require("express");
const { loginController, signUpController } = require("./local.controller");

const router = Router();

router.post("/signup/", signUpController);
router.post("/login", loginController);

module.exports = router;
