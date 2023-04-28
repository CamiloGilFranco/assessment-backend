const { Router } = require("express");
const {
  create_favorite_per_list_controller,
  delete_favorite_per_list_controller,
  get_favorite_per_list_controller,
} = require("./favorite_items_per_list.controller");

const router = Router();

router.post("/", create_favorite_per_list_controller);
router.delete("/", delete_favorite_per_list_controller);
router.get("/", get_favorite_per_list_controller);

module.exports = router;
