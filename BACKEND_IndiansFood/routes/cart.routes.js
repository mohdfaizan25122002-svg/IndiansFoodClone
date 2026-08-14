const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const {
  getCart,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
} = require("../controllers/cart.controllers");

router.get("/", auth, getCart);
router.post("/", auth, addToCart);
router.put("/:id", auth, updateCartQuantity);
router.patch("/:id", auth, updateCartQuantity);
router.delete("/clear", auth, clearCart);
router.delete("/:id", auth, removeFromCart);

module.exports = router;