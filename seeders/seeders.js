const { PrismaClient } = require("@prisma/client");
const seed_favorite_items = require("./favorite_items.seeder");

const prisma = new PrismaClient();

const seeders = [seed_favorite_items];

const seed = async () => {
  for (const seeder of seeders) {
    await seeder(prisma);
  }
};

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
