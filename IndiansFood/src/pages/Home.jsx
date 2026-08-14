import React, { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import SearchBar from "../components/Searchbar";
import OfferBanner from "../components/OfferBanner";
import CategoryCard from "../components/Categorycard";
import FoodCard from "../components/Foods";
import RestaurantCard from "../components/RestaurantCard";
import Footer from "../components/Footer";

import categories from "../data/categories";
import foods from "../data/foods";
import restaurants from "../data/restaurants";
import api from "../services/api";

const defaultCategoryImage = "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80";

const Home = () => {
  const [menuFoods, setMenuFoods] = useState(foods);
  const [menuCategories, setMenuCategories] = useState(categories);
  const [filteredFoods, setFilteredFoods] = useState(foods);

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const [foodsResponse, categoriesResponse] = await Promise.all([
          api.get("/foods"),
          api.get("/categories"),
        ]);

        if (foodsResponse.data.foods?.length) {
          const backendFoods = foodsResponse.data.foods.map((food) => ({
            ...food,
            image: toImageUrl(food.image),
          }));
          setMenuFoods(backendFoods);
          setFilteredFoods(backendFoods);
        }

        if (categoriesResponse.data.categories?.length) {
          const categoryDefaults = new Map(
            categories.map((category) => [category.name.toLowerCase(), category])
          );
          setMenuCategories(categoriesResponse.data.categories.map((category) => {
            const fallback = categoryDefaults.get(category.name.toLowerCase());
            return {
              ...category,
              image: toImageUrl(category.image) || fallback?.image || defaultCategoryImage,
              icon: fallback?.icon || "🍽️",
              description: fallback?.description || `Explore ${category.name} dishes`,
            };
          }));
        }
      } catch {
        // The local menu remains available if the API is temporarily offline.
      }
    };

    loadMenu();
  }, []);

  const handleSearch = (value) => {
    const q = value.trim().toLowerCase();
    if (!q) return setFilteredFoods(menuFoods);
    setFilteredFoods(
      menuFoods.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
      )
    );
  };

  const handleCategoryClick = (cat) => {
    setFilteredFoods(
      menuFoods.filter(
        (f) => f.category.toLowerCase() === cat.name.toLowerCase()
      )
    );
    const el = document.getElementById("popular-foods");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div data-testid="home-page">
      <Navbar />

      {/* Hero */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>Delicious Food, Delivered Fast 🍽️</h1>
        <p style={styles.heroSub}>
          Order your favorite Indian meals from the best restaurants near you.
        </p>
      </section>

      <SearchBar onSearch={handleSearch} />

      <OfferBanner />

      <div style={styles.section}>
        <h2>Popular Categories</h2>
        <div style={styles.grid}>
          {menuCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onClick={handleCategoryClick}
            />
          ))}
        </div>
      </div>

      <div id="popular-foods" style={styles.section}>
        <h2>Popular Foods</h2>
        <div style={styles.grid}>
          {filteredFoods.length > 0 ? (
            filteredFoods.map((food) => (
              <FoodCard key={food.id} food={food} />
            ))
          ) : (
            <h2 data-testid="no-food-found">No Food Found</h2>
          )}
        </div>
      </div>

      <div style={styles.section}>
        <h2>Top Restaurants</h2>
        <div style={styles.grid}>
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

const toImageUrl = (image) => {
  if (!image) return null;
  if (/^https?:\/\//i.test(image)) return image;
  const backendUrl = (import.meta.env.VITE_API_URL || "http://localhost:5002/api").replace(/\/api\/?$/, "");
  return `${backendUrl}${image.startsWith("/") ? image : `/${image}`}`;
};

const styles = {
  hero: {
    padding: "60px 20px 30px",
    background: "linear-gradient(135deg,#FFE6CC,#FFC78C)",
    textAlign: "center",
  },
  heroTitle: { margin: 0, fontSize: "2.4rem", color: "#111827" },
  heroSub: { marginTop: "10px", color: "#4b5563", fontSize: "1.05rem" },
  section: { padding: "30px 20px", textAlign: "center" },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
    marginTop: "20px",
  },
};

export default Home;
