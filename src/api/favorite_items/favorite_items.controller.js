const { getAllItems } = require("./favorite_items.services");

const getAllItemsController = async (req, res) => {
  try {
    const items = await getAllItems();
    res.status(201).json({ message: "Items found", data: items });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Items can't be found" });
  }
};

module.exports.getAllItemsController = getAllItemsController;
