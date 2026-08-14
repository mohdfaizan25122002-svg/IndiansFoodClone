const express = require("express");
const auth = require("../middleware/auth");
const controller = require("../controllers/frontend.controllers");

const router = express.Router();

router.get("/foods", controller.getFoods);
router.get("/categories", controller.getCategories);
router.get("/cart", auth, controller.getCart);
router.put("/cart", auth, controller.saveCart);
router.post("/orders", auth, controller.createOrder);
router.get("/orders", auth, controller.getOrders);
router.delete("/orders/:orderId", auth, controller.cancelOrder);

module.exports = router;
