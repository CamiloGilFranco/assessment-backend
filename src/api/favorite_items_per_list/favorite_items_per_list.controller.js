const {
  create_favorite_per_list,
  delete_favorite_per_list,
  get_favorite_per_list,
} = require("./favorite_items_per_list.services");

const create_favorite_per_list_controller = async (req, res) => {
  try {
    const { favorite_list, favorite_item } = req.body;
    const item = await create_favorite_per_list({
      favorite_list,
      favorite_item,
    });
    res.status(201).json({ message: "Item created", data: item });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Item can't be created" });
  }
};

const delete_favorite_per_list_controller = async (req, res) => {
  try {
    const { id } = req.body;
    const item = await delete_favorite_per_list({ id });
    res.status(201).json({ message: "Item deleted", data: item });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Item can't be deleted" });
  }
};

const get_favorite_per_list_controller = async (req, res) => {
  try {
    const { favorite_list } = req.params;
    const items = await get_favorite_per_list({
      favorite_list,
    });
    res.status(201).json({ message: "List items found", data: items });
  } catch (error) {
    res.status(500).json({ message: "Item can't be deleted" });
  }
};

module.exports.create_favorite_per_list_controller =
  create_favorite_per_list_controller;
module.exports.delete_favorite_per_list_controller =
  delete_favorite_per_list_controller;
module.exports.get_favorite_per_list_controller =
  get_favorite_per_list_controller;
