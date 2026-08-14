const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const upload = require("../middleware/upload");

const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controllers");

router.get("/", auth, admin, getUsers);
router.get("/:id", auth, getUser);
router.put("/:id", auth, upload.single("profileImage"), updateUser);
router.patch("/:id", auth, upload.single("profileImage"), updateUser);
router.delete("/:id", auth, admin, deleteUser);

module.exports = router;