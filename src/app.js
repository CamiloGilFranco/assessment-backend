const express = require("express");
const configExpress = require("./config/express.js");
const routes = require("./routes.js");
require("dotenv").config();

const app = express();

const port = process.env.PORT;

configExpress(app);

routes(app);

app.listen(port, () => {
  console.log("server running");
});
