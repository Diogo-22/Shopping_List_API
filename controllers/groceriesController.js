//const Grocery = require("../model/List");
const List = require("../model/List");

const getAllGroceries = async (req, res) => {
  if (req.params?.id === undefined)
    return res.status(400).json({ message: "List ID required" });
  const list = await List.findOne({ _id: req.params.id }).exec();
  if (!list) return res.status(204).json({ message: "No list found." });
  listItems = list.items.map((item) => ({
    name: item.name,
    id: item.numid,
    checked: item.checked,
  }));
  res.json(listItems);
};

const createNewGrocery = async (req, res) => {
  // const list = await List.findOne({ _id: req.params.id }).exec();
  if (!req?.body?.name) {
    return res.status(400).json({ message: "Grocery name is required" });
  }
  if (req?.body?.checked && req?.body?.id) {
    const result = await List.updateOne(
      {
        /* userid: "64a9bd8d3b5f5bf9b8a2ba16", listname: "Familia" */ _id: req
          .params.id,
      },
      {
        $push: {
          items: {
            name: req.body.name,
            numid: req.body.id, // Update this to the appropriate value
            checked: false,
          },
        },
      }
    );

    return res.status(201).json(result);
  }
};

const updateGrocery = async (req, res) => {
  try {
    if (!req?.body?.name) {
      return res
        .status(400)
        .json({ error: "Bad Request", message: "Name parameter is required." });
    }

    if (!req?.body?.checked || !req?.body?.id) {
      return res.status(400).json({
        error: "Bad Request",
        message: "checked and id parameter is required.",
      });
    }
    const result = await List.updateOne(
      { _id: req.params.id, "items.numid": req.body.id }, // Match the specific item using its numid
      {
        $set: {
          "items.$.name": req.body.name,
          "items.$.checked": req.body.checked,
          // You can add more properties to update here
        },
      }
    );

    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteGrocery = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "Grocery ID required" });

  const result = await List.updateOne(
    { _id: req.params.id },
    {
      $pull: {
        items: { numid: req.body.id }, // Match the specific item using its numid
      },
    }
  );

  res.json(result);
};

module.exports = {
  getAllGroceries,
  createNewGrocery,
  updateGrocery,
  deleteGrocery,
};
