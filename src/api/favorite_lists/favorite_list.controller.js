const {
  create_favorite_list,
  delete_favorite_list,
  get_all_favorite_list_per_user,
} = require("./favorite_list.services");
const {
  delete_all_favorite_per_list,
} = require("../favorite_items_per_list/favorite_items_per_list.services");

const create_favorite_list_controller = async (req, res) => {
  try {
    const { user } = req;
    const { name } = req.body;
    const { id, list_name } = await create_favorite_list({
      user,
      name,
    });
    res.status(201).json({ message: "List created", data: { id, list_name } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "List can't be created" });
  }
};

const delete_favorite_list_controller = async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.body;
    await delete_all_favorite_per_list({ list_id: id });
    const item = await delete_favorite_list({
      user,
      id,
    });
    res.status(201).json({
      message: "List deleted",
      data: { id: item.id, list_name: item.list_name },
    });
  } catch (error) {
    res.status(500).json({ message: "List can't be deleted" });
  }
};

const get_all_favorite_list_per_user_controller = async (req, res) => {
  try {
    const { user } = req;
    console.log(user);
    const items = await get_all_favorite_list_per_user({
      user,
    });
    res.status(201).json({ message: "List found", data: items });
  } catch (error) {
    res.status(500).json({ message: "List can't be found" });
  }
};

module.exports.create_favorite_list_controller =
  create_favorite_list_controller;
module.exports.delete_favorite_list_controller =
  delete_favorite_list_controller;
module.exports.get_all_favorite_list_per_user_controller =
  get_all_favorite_list_per_user_controller;
