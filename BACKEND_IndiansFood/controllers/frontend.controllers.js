const Cart = require("../models/Cart");
const Category = require("../models/Category");
const Order = require("../models/Order");
const Product = require("../models/Product");

const foodResponse = (product) => ({
  id: product._id.toString(),
  image: product.image,
  name: product.title,
  category: product.category?.name || product.category || "",
  rating: product.rating,
  price: product.discountPrice > 0 ? product.discountPrice : product.price,
  description: product.description,
});

const cartResponse = (cart) => ({
  id: cart._id.toString(),
  items: cart.products
    .filter((item) => item.product)
    .map((item) => ({ ...foodResponse(item.product), quantity: item.quantity })),
});

exports.getFoods = async (req, res, next) => {
  try {
    const foods = await Product.find({ isAvailable: true })
      .populate("category", "name")
      .sort({ createdAt: -1 });
    res.json({ success: true, foods: foods.map(foodResponse) });
  } catch (error) {
    next(error);
  }
};

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json({
      success: true,
      categories: categories.map((category) => ({
        id: category._id.toString(),
        name: category.name,
        image: category.image,
      })),
    });
  } catch (error) {
    next(error);
  }
};

exports.getCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate({
      path: "products.product",
      populate: { path: "category", select: "name" },
    });
    if (!cart) cart = await Cart.create({ user: req.user._id, products: [] });
    res.json({ success: true, cart: cartResponse(cart) });
  } catch (error) {
    next(error);
  }
};

exports.saveCart = async (req, res, next) => {
  try {
    const { items } = req.body;
    if (!Array.isArray(items)) {
      return res.status(400).json({ success: false, message: "items must be an array" });
    }

    const quantities = new Map();
    for (const item of items) {
      const productId = item.id || item.productId || item.product;
      const quantity = Number(item.quantity);
      if (!productId || !Number.isInteger(quantity) || quantity < 1) {
        return res.status(400).json({ success: false, message: "Each item needs a valid id and quantity" });
      }
      quantities.set(String(productId), quantity);
    }

    const productIds = [...quantities.keys()];
    const products = await Product.find({ _id: { $in: productIds }, isAvailable: true });
    if (products.length !== productIds.length) {
      return res.status(400).json({ success: false, message: "One or more foods are unavailable" });
    }

    const cart = await Cart.findOneAndUpdate(
      { user: req.user._id },
      { $set: { products: productIds.map((id) => ({ product: id, quantity: quantities.get(id) })) } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    ).populate({ path: "products.product", populate: { path: "category", select: "name" } });

    res.json({ success: true, cart: cartResponse(cart) });
  } catch (error) {
    next(error);
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    const { items, paymentMethod = "COD", deliveryAddress = "Not provided" } = req.body;
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: "At least one order item is required" });
    }

    const ids = items.map((item) => String(item.id || item.productId || item.product));
    if (ids.some((id) => !id || id === "undefined")) {
      return res.status(400).json({ success: false, message: "Each item needs a food id" });
    }
    const products = await Product.find({ _id: { $in: ids }, isAvailable: true });
    if (products.length !== ids.length) {
      return res.status(400).json({ success: false, message: "One or more foods are unavailable" });
    }

    const productById = new Map(products.map((product) => [product._id.toString(), product]));
    const orderProducts = items.map((item) => {
      const quantity = Number(item.quantity);
      if (!Number.isInteger(quantity) || quantity < 1) throw new Error("Each item needs a valid quantity");
      return { product: item.id || item.productId || item.product, quantity };
    });
    const subtotal = orderProducts.reduce(
      (sum, item) => sum + (productById.get(item.product.toString()).discountPrice || productById.get(item.product.toString()).price) * item.quantity,
      0
    );
    const totalAmount = subtotal + (subtotal > 0 && subtotal < 299 ? 40 : 0);

    const order = await Order.create({ user: req.user._id, products: orderProducts, totalAmount, paymentMethod, deliveryAddress });
    await Cart.findOneAndUpdate({ user: req.user._id }, { $set: { products: [] } });
    res.status(201).json({ success: true, order: { orderId: order._id.toString(), date: order.createdAt, total: order.totalAmount, status: order.orderStatus } });
  } catch (error) {
    next(error);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate({ path: "products.product", populate: { path: "category", select: "name" } })
      .sort({ createdAt: -1 });
    res.json({ success: true, orders: orders.map((order) => ({
      orderId: order._id.toString(), date: order.createdAt, total: order.totalAmount, status: order.orderStatus,
      items: order.products.filter((item) => item.product).map((item) => ({ ...foodResponse(item.product), quantity: item.quantity })),
    })) });
  } catch (error) {
    next(error);
  }
};

exports.cancelOrder = async (req, res, next) => {
  try {
    const order = await Order.findOneAndUpdate(
      { _id: req.params.orderId, user: req.user._id, orderStatus: { $in: ["Placed", "Preparing"] } },
      { $set: { orderStatus: "Cancelled" } }, { new: true }
    );
    if (!order) return res.status(404).json({ success: false, message: "Order cannot be cancelled" });
    res.json({ success: true, message: "Order cancelled" });
  } catch (error) {
    next(error);
  }
};
