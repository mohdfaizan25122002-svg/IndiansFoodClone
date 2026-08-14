const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const {
  createReview,
  getReviews,
  getProductReviews,
  updateReview,
  deleteReview,
} = require("../controllers/review.controllers");

router.get("/", getReviews);
router.get("/product/:productId", getProductReviews);
router.post("/", auth, createReview);
router.put("/:id", auth, updateReview);
router.patch("/:id", auth, updateReview);
router.delete("/:id", auth, deleteReview);

module.exports = router;