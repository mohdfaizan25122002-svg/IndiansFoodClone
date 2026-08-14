const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const upload = require("../middleware/upload");

const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controllers");

router.get("/", getCategories);
router.get("/:id", getCategory);

router.post("/", auth, admin, upload.single("image"), createCategory);
router.put("/:id", auth, admin, upload.single("image"), updateCategory);
router.patch("/:id", auth, admin, upload.single("image"), updateCategory);
router.delete("/:id", auth, admin, deleteCategory);

module.exports = router;