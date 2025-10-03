const express = require("express");
const router = express.Router();

const {
  getAllUsersController,
  getUsersBasicController,
  createUserController,
  updateUserController,
  deleteUserController,
} = require("../controllers/users.controller");

router.get("/users/basic", getUsersBasicController);

router.get("/users", getAllUsersController);
router.post("/users", createUserController);
router.put("/users/:id", updateUserController);
router.delete("/users/:id", deleteUserController);

module.exports = router;