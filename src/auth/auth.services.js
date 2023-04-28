const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const prisma = new PrismaClient();

const SECRET_KEY = process.env.SECRET_KEY;

const signToken = (payload) => {
  const token = jwt.sign(payload, SECRET_KEY, { algorithm: "HS256" });
  return token;
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY, { algorithm: "HS256" });

    return decoded;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const login = (email) => {
  return prisma.users.findUnique({
    where: {
      email,
    },
  });
};

module.exports.signToken = signToken;
module.exports.verifyToken = verifyToken;
module.exports.login = login;
