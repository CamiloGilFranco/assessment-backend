const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const create_favorite_list = ({ user, name }) => {
  return prisma.favorite_lists.create({
    data: { usersId: user, list_name: name },
  });
};

const delete_favorite_list = ({ usersId, id }) => {
  return prisma.favorite_lists.delete({
    where: { usersId, id },
  });
};

const get_all_favorite_list_per_user = ({ user }) => {
  return prisma.favorite_lists.findMany({
    where: { usersId: user },
  });
};

module.exports.create_favorite_list = create_favorite_list;
module.exports.delete_favorite_list = delete_favorite_list;
module.exports.get_all_favorite_list_per_user = get_all_favorite_list_per_user;
