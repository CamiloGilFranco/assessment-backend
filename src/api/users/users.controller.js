const {
  createUser,
  updateUserEmail,
  updateUserPassword,
  getSingleUser,
  deleteUser,
} = require("./users.services");
const {
  get_all_favorite_list_per_user,
  delete_favorite_list,
} = require("../favorite_lists/favorite_list.services");
const {
  delete_all_favorite_per_list,
} = require("../favorite_items_per_list/favorite_items_per_list.services");
const bcrypt = require("bcrypt");

const createUserController = async (req, res) => {
  try {
    const product = await createUser(req.body);
    res.status(201).json({ message: "user created", data: product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "user can't be created" });
  }
};

const updateUserEmailController = async (req, res) => {
  try {
    const { user } = req;
    const { email } = req.body;
    const product = await updateUserEmail({ user, email });
    res.status(201).json({
      message: "email updated",
      data: { email: product.email },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "email can't be updated" });
  }
};

const updateUserPasswordController = async (req, res) => {
  try {
    const { user } = req;
    const { old_password, new_password } = req.body;

    const singleUser = await getSingleUser({ user });

    const isValid = await bcrypt.compare(old_password, singleUser.password);

    if (!isValid) {
      throw new Error("Email o contraseña incorrecta");
    }

    const encPassword = await bcrypt.hash(new_password, 10);

    const product = await updateUserPassword({ user, encPassword });
    res.status(201).json({
      message: "password updated",
      data: { email: product.email },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "password can't be updated" });
  }
};

const deleteUserController = async (req, res) => {
  try {
    const { user } = req;
    const { password } = req.body;

    const singleUser = await getSingleUser({ user });

    const isValid = await bcrypt.compare(password, singleUser.password);

    if (!isValid) {
      throw new Error("Email o contraseña incorrecta");
    }

    const userLists = await get_all_favorite_list_per_user({ user });

    for (const list of userLists) {
      await delete_all_favorite_per_list({ list_id: list.id });
      await delete_favorite_list({ userId: user, id: list.id });
    }

    const deletedUser = await deleteUser({ user });

    res.status(201).json({
      message: "User deleted",
      data: { user: deletedUser.email },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "User can't be deleted" });
  }
};

module.exports.createUserController = createUserController;
module.exports.updateUserEmailController = updateUserEmailController;
module.exports.updateUserPasswordController = updateUserPasswordController;
module.exports.deleteUserController = deleteUserController;
