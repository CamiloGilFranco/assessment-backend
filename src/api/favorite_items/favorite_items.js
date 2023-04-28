const { Router } = require("express");
const { getAllItemsController } = require("./favorite_items.controller");

const router = Router();

router.get("/", getAllItemsController);

module.exports = router;
