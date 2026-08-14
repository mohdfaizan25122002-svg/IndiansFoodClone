const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const {
  createOrder,
  getMyOrders,
  getOrder,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/order.controllers");

router.post("/", auth, createOrder);
router.get("/myorders", auth, getMyOrders);
router.get("/admin/all", auth, admin, getAllOrders);
router.get("/:id", auth, getOrder);
router.get("/", auth, getMyOrders);
router.put("/:id/status", auth, admin, updateOrderStatus);
router.patch("/:id/status", auth, admin, updateOrderStatus);

module.exports = router;