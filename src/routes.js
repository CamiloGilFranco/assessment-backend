const healthcheck = require("./api/healthcheck/healthcheck.js");
const users = require("./api/users/users.js");
const list = require("./api/favorite_lists/favorite_list.js");
const favorite = require("./api/favorite_items_per_list/favorite_items_per_list.js");
const authLocal = require("./auth/local/local.js");
const items = require("./api/favorite_items/favorite_items.js");

const routes = (app) => {
  app.use("/api/healthcheck", healthcheck);
  app.use("/api/users", users);
  app.use("/api/list", list);
  app.use("/api/favorite", favorite);
  app.use("/api/local", authLocal);
  app.use("/api/items", items);
};

module.exports = routes;
