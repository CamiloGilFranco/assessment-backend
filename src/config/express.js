const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const configExpress = (app) => {
  app.use(cors());
  app.use(express.json());
  app.use(morgan("dev"));
};

module.exports = configExpress;
