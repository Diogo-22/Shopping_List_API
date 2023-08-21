const express = require("express");
const router = express.Router();
const groceriesController = require("../../controllers/groceriesController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router.route("/");
//.get(groceriesController.getAllGroceries)
/* .post(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    groceriesController.createNewGrocery
  )
  .put(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    groceriesController.updateGrocery
  )
  .delete(verifyRoles(ROLES_LIST.Admin), groceriesController.deleteGrocery);
 */
router
  .route("/:id")
  .get(groceriesController.getAllGroceries)
  .post(groceriesController.createNewGrocery)
  .put(groceriesController.updateGrocery)
  .delete(groceriesController.deleteGrocery);

module.exports = router;
