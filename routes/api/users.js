const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/usersController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  //.get(usersController.getAllUsers)
  .post(usersController.getUserLists)
  .patch(usersController.addUserToList)
  .delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteUser);

router
  .route("/:username") //.get(usersController.getAllUsers);
  .get(usersController.getUser);

router.route("/:id").delete(usersController.deleteUserList);

module.exports = router;
