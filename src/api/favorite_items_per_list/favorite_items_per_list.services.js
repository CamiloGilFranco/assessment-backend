const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const create_favorite_per_list = ({ favorite_list, favorite_item }) => {
  return prisma.favorite_items_per_list.create({
    data: {
      favorite_listsId: favorite_list,
      favorite_itemsId: favorite_item,
    },
  });
};

const delete_favorite_per_list = ({ id }) => {
  return prisma.favorite_items_per_list.delete({
    where: { id },
  });
};

const get_favorite_per_list = ({ favorite_list }) => {
  return prisma.favorite_items_per_list.findMany({
    where: {
      favorite_list,
    },
  });
};

const delete_all_favorite_per_list = ({ list_id }) => {
  return prisma.favorite_items_per_list.deleteMany({
    where: { favorite_listsId: list_id },
  });
};

module.exports.create_favorite_per_list = create_favorite_per_list;
module.exports.delete_favorite_per_list = delete_favorite_per_list;
module.exports.get_favorite_per_list = get_favorite_per_list;
module.exports.delete_all_favorite_per_list = delete_all_favorite_per_list;
