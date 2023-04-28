const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createUser = ({ email, password }) => {
  return prisma.users.create({
    data: { email, password },
  });
};

const updateUserEmail = ({ user, email }) => {
  return prisma.users.update({
    where: {
      id: user,
    },
    data: {
      email,
    },
  });
};

const getSingleUser = ({ user }) => {
  return prisma.users.findUnique({
    where: {
      id: user,
    },
  });
};

const updateUserPassword = ({ user, encPassword }) => {
  return prisma.users.update({
    where: {
      id: user,
    },
    data: {
      password: encPassword,
    },
  });
};

const deleteUser = ({ user }) => {
  return prisma.users.delete({
    where: {
      id: user,
    },
  });
};

module.exports.createUser = createUser;
module.exports.updateUserEmail = updateUserEmail;
module.exports.getSingleUser = getSingleUser;
module.exports.updateUserPassword = updateUserPassword;
module.exports.deleteUser = deleteUser;
