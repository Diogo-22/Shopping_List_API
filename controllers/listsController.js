const List = require("../model/List");

/* const getAllUserLists = async (req, res) => {
  if (!req?.id) return res.status(400).json({ message: "User ID required" });
  const user = await List.findOne({
    groceries: [[{ userid: req.id }]],
  }).exec();
  console.log(List);
  if (!user) {
    return res.status(204).json({ message: `User ID ${req.id} not found` });
  }
  res.json(user);
}; */

const createList = async (req, res) => {
  if (!req?.body?.id) {
    console.log(req.body);
    return res
      .status(400)
      .json({ message: "User ID is required" + `${req.body}` });
  }
  if (req?.body?.id) {
    /* const nameoflist = req.body.listname;
    const list = await List.findOne({ listname: nameoflist });
    if (list) {
      return res.status(400).json({ message: "List Name already exists" });
    } */
    const result = await List.create({
      userids: [
        {
          userid: req.body.id,
        },
      ],
      listname: req.body.listname,
      items: [
        {
          name: req.body.items.name,
          numid: req.body.items.numid,
          checked: req.body.items.checked,
        },
      ],
    });
    return res.status(201).json(result);
  }
};

const updateList = async (req, res) => {
  if (!req?.body?.id) {
    console.log(req.body);
    return res.status(400).json({ message: "User ID is required" });
  }
  const list = await List.findOne({
    groceries: { userid: req.body.id },
  }).exec();
  if (!list) {
    return res
      .status(404)
      .json({ error: "Not Found", message: "GroceryList not found." });
  }
  console.log(list);
  list.name = req.body.name;
  list.numid = req.body.id;
  list.checked = req.body.checked;
};

module.exports = { createList, updateList };
