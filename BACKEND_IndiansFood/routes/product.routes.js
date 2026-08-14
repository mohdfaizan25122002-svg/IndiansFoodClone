const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const upload = require("../middleware/upload");

const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
  productByCategory,
} = require("../controllers/product.controllers");

// Public Routes
router.get("/", getProducts);

router.get("/search", searchProduct);

router.get("/category/:categoryId", productByCategory);

router.get("/:id", getProduct);

// Admin Routes
router.post(
  "/",
  auth,
  admin,
  upload.single("image"),
  createProduct
);

router.put(
  "/:id",
  auth,
  admin,
  upload.single("image"),
  updateProduct
);

router.delete(
  "/:id",
  auth,
  admin,
  deleteProduct
);

module.exports = router;