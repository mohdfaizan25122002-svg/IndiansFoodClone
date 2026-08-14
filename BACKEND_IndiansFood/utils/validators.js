// Email validation
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation (min 6 characters)
const validatePassword = (password) => {
  return password && password.length >= 6;
};

// Strong password validation (min 8 chars, uppercase, lowercase, number, special char)
const validateStrongPassword = (password) => {
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return strongPasswordRegex.test(password);
};

// Phone number validation (10 digits)
const validatePhoneNumber = (phone) => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone.toString());
};

// Name validation (2-50 characters, only letters and spaces)
const validateName = (name) => {
  const nameRegex = /^[a-zA-Z\s]{2,50}$/;
  return nameRegex.test(name);
};

// Price validation (positive number with up to 2 decimal places)
const validatePrice = (price) => {
  const priceRegex = /^\d+(\.\d{1,2})?$/;
  return priceRegex.test(parseFloat(price)) && parseFloat(price) > 0;
};

// Quantity validation (positive integer)
const validateQuantity = (quantity) => {
  return Number.isInteger(quantity) && quantity > 0;
};

// URL validation
const validateURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

// Product validation
const validateProduct = (product) => {
  const { name, description, price, category, image } = product;

  if (!name || name.trim().length < 2 || name.trim().length > 100) {
    return { valid: false, message: "Product name must be between 2-100 characters" };
  }

  if (!description || description.trim().length < 10) {
    return { valid: false, message: "Product description must be at least 10 characters" };
  }

  if (!validatePrice(price)) {
    return { valid: false, message: "Invalid price. Must be a positive number" };
  }

  if (!category || category.trim().length === 0) {
    return { valid: false, message: "Category is required" };
  }

  if (!image || image.trim().length === 0) {
    return { valid: false, message: "Product image is required" };
  }

  return { valid: true };
};

// User registration validation
const validateUserRegistration = (user) => {
  const { name, email, password, phone, address } = user;

  if (!validateName(name)) {
    return { valid: false, message: "Invalid name. Must be 2-50 characters, letters and spaces only" };
  }

  if (!validateEmail(email)) {
    return { valid: false, message: "Invalid email format" };
  }

  if (!validatePassword(password)) {
    return { valid: false, message: "Password must be at least 6 characters" };
  }

  if (!validatePhoneNumber(phone)) {
    return { valid: false, message: "Invalid phone number. Must be 10 digits" };
  }

  if (!address || address.trim().length < 5) {
    return { valid: false, message: "Address must be at least 5 characters" };
  }

  return { valid: true };
};

// User login validation
const validateUserLogin = (credentials) => {
  const { email, password } = credentials;

  if (!validateEmail(email)) {
    return { valid: false, message: "Invalid email format" };
  }

  if (!validatePassword(password)) {
    return { valid: false, message: "Invalid password" };
  }

  return { valid: true };
};

// Review validation
const validateReview = (review) => {
  const { rating, comment, userId, productId } = review;

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return { valid: false, message: "Rating must be between 1 and 5" };
  }

  if (!comment || comment.trim().length < 5 || comment.trim().length > 500) {
    return { valid: false, message: "Comment must be between 5-500 characters" };
  }

  if (!userId) {
    return { valid: false, message: "User ID is required" };
  }

  if (!productId) {
    return { valid: false, message: "Product ID is required" };
  }

  return { valid: true };
};

// Category validation
const validateCategory = (category) => {
  const { name, description, image } = category;

  if (!name || name.trim().length < 2 || name.trim().length > 50) {
    return { valid: false, message: "Category name must be between 2-50 characters" };
  }

  if (description && description.trim().length > 200) {
    return { valid: false, message: "Category description must not exceed 200 characters" };
  }

  if (!image || image.trim().length === 0) {
    return { valid: false, message: "Category image is required" };
  }

  return { valid: true };
};

// Order validation
const validateOrder = (order) => {
  const { items, deliveryAddress, totalAmount, paymentMethod } = order;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return { valid: false, message: "Order must contain at least one item" };
  }

  for (let item of items) {
    if (!validateQuantity(item.quantity)) {
      return { valid: false, message: "Invalid item quantity" };
    }
    if (!validatePrice(item.price)) {
      return { valid: false, message: "Invalid item price" };
    }
  }

  if (!deliveryAddress || deliveryAddress.trim().length < 5) {
    return { valid: false, message: "Delivery address must be at least 5 characters" };
  }

  if (!validatePrice(totalAmount)) {
    return { valid: false, message: "Invalid total amount" };
  }

  const validPaymentMethods = ["Cash", "Card", "UPI", "Wallet"];
  if (!paymentMethod || !validPaymentMethods.includes(paymentMethod)) {
    return { valid: false, message: "Invalid payment method" };
  }

  return { valid: true };
};

// Cart item validation
const validateCartItem = (item) => {
  const { productId, quantity } = item;

  if (!productId) {
    return { valid: false, message: "Product ID is required" };
  }

  if (!validateQuantity(quantity)) {
    return { valid: false, message: "Invalid quantity. Must be a positive integer" };
  }

  return { valid: true };
};

// User update validation
const validateUserUpdate = (data) => {
  if (data.name && !validateName(data.name)) {
    return { valid: false, message: "Invalid name" };
  }

  if (data.email && !validateEmail(data.email)) {
    return { valid: false, message: "Invalid email" };
  }

  if (data.phone && !validatePhoneNumber(data.phone)) {
    return { valid: false, message: "Invalid phone number" };
  }

  if (data.address && data.address.trim().length < 5) {
    return { valid: false, message: "Address must be at least 5 characters" };
  }

  return { valid: true };
};

// Check if value is valid MongoDB ObjectId
const validateObjectId = (id) => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

module.exports = {
  validateEmail,
  validatePassword,
  validateStrongPassword,
  validatePhoneNumber,
  validateName,
  validatePrice,
  validateQuantity,
  validateURL,
  validateProduct,
  validateUserRegistration,
  validateUserLogin,
  validateReview,
  validateCategory,
  validateOrder,
  validateCartItem,
  validateUserUpdate,
  validateObjectId,
};
