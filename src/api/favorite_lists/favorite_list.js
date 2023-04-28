const { Router } = require("express");
const {
  create_favorite_list_controller,
  delete_favorite_list_controller,
  get_all_favorite_list_per_user_controller,
} = require("./favorite_list.controller");
const { auth } = require("../../middlewares/auth");

const router = Router();

router.post("/", auth, create_favorite_list_controller);
router.delete("/", auth, delete_favorite_list_controller);
router.get("/", auth, get_all_favorite_list_per_user_controller);

module.exports = router;
