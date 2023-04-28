const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAllItems = () => {
  return prisma.favorite_items.findMany();
};

module.exports.getAllItems = getAllItems;
