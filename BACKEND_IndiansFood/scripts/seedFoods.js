require("dotenv").config();

const mongoose = require("mongoose");
const connectDatabase = require("../config/database");
const Category = require("../models/Category");
const Product = require("../models/Product");

const foods = [
  { name: "Cheese Pizza", category: "Pizza", rating: 4.8, price: 299, description: "Fresh Cheese Pizza with extra toppings.", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80" },
  { name: "Chicken Burger", category: "Burger", rating: 4.6, price: 199, description: "Juicy chicken burger with cheese.", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80" },
  { name: "Hyderabadi Biryani", category: "Biryani", rating: 4.9, price: 249, description: "Authentic Hyderabadi Dum Biryani.", image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80" },
  { name: "French Fries", category: "Snacks", rating: 4.4, price: 149, description: "Crispy golden fries.", image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=600&q=80" },
  { name: "Veg Salad", category: "Healthy", rating: 4.5, price: 179, description: "Healthy mixed vegetable salad.", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=600&q=80" },
  { name: "Chocolate Cake", category: "Dessert", rating: 4.9, price: 349, description: "Soft chocolate cake.", image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=600&q=80" },
];

const seed = async () => {
  const connected = await connectDatabase();
  if (!connected) process.exitCode = 1;
  if (!connected) return;

  for (const food of foods) {
    const category = await Category.findOneAndUpdate(
      { name: food.category },
      { $setOnInsert: { name: food.category } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    await Product.findOneAndUpdate(
      { title: food.name },
      { $set: { title: food.name, description: food.description, price: food.price, image: food.image, rating: food.rating, category: category._id, stock: 100, isAvailable: true } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
  }
  console.log("Frontend foods seeded successfully.");
  await mongoose.disconnect();
};

seed().catch(async (error) => {
  console.error(error.message);
  await mongoose.disconnect();
  process.exitCode = 1;
});
