const { Router } = require("express");
const {
  createUserController,
  updateUserEmailController,
  updateUserPasswordController,
  deleteUserController,
} = require("./users.controller");
const { auth } = require("../../middlewares/auth");

const router = Router();

router.post("/", createUserController);
router.put("/email", auth, updateUserEmailController);
router.put("/password", auth, updateUserPasswordController);
router.delete("/", auth, deleteUserController);

module.exports = router;
