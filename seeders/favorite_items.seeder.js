const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

const seed_favorite_items = async (prisma) => {
  const products = [];

  for (let i = 0; i < 100; i++) {
    const product = {
      title: faker.commerce.product(),
      description: faker.commerce.productDescription(),
      link: faker.internet.url(),
    };

    products.push(product);
  }

  await prisma.favorite_items.createMany({
    data: products,
  });

  console.log("favorite items created successfully");
};

module.exports = seed_favorite_items;
