const User = require("../model/User");
const List = require("../model/List");

/* const getAllUsers = async (req, res) => {
  const userId = req.params.id;
  let users;
  try {
    users = await User.find({ _id: { $ne: userId } });
    if (!users) return res.status(204).json({ message: "No users found" });
    res.json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    throw error;
  }
}; */
const getUser = async (req, res) => {
  const username = req.params.username;
  try {
    const user = await User.findOne({ username }); // Find the user by username
    if (!user) return res.status(204).json({ message: "No user found" });
    res.json(user); // Return the user object if found, or null if not found
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "User ID required" });
  const user = await User.findOne({ _id: req.body.id }).exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `User ID ${req.body.id} not found` });
  }
  const result = await user.deleteOne({ _id: req.body.id });
  res.json(result);
};

const getUserLists = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "User ID required" });
  try {
    const userLists = await List.find({ "userids.userid": req.body.id });

    if (!userLists) {
      return res
        .status(204)
        .json({ message: `No lists found for User ID ${req.body.id}` });
    }

    res.json(userLists);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving user lists", error });
  }
};

const addUserToList = async (req, res) => {
  const userid = req.body.userid;
  const listid = req.body.listid;
  if (!userid || !listid)
    return res.status(400).json({ message: "User ID and List ID required" });
  try {
    const result = await List.updateOne(
      { _id: listid },
      {
        $push: {
          userids: {
            userid: userid,
          },
        },
      }
    );
    if (!result) return res.status(204).json({ message: "No list found" });
    res.json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error adding user to list", error });
  }
};

const deleteUserList = async (req, res) => {
  const listid = req.params.id;
  if (!listid) return res.status(400).json({ message: "List ID required" });
  try {
    // Find the list by its id and delete it
    const deletedList = await List.findByIdAndDelete(listid);

    if (!deletedList) {
      return res.status(404).json({ message: "List not found" });
    }

    return res.status(200).json({ message: "List deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  //getAllUsers,
  getUser,
  deleteUser,
  getUserLists,
  addUserToList,
  deleteUserList,
};
