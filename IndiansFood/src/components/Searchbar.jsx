import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const handleClick = () => onSearch(search);

  return (
    <div style={styles.container} data-testid="search-bar">
      <FiSearch size={22} color="#777" />
      <input
        type="text"
        placeholder="Search food, restaurants..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          onSearch(e.target.value);
        }}
        style={styles.input}
        data-testid="search-input"
      />
      <button
        style={styles.button}
        onClick={handleClick}
        data-testid="search-btn"
      >
        Search
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "#fff",
    padding: "12px 15px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    width: "90%",
    maxWidth: "700px",
    margin: "20px auto",
  },
  input: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: "16px",
    padding: "10px",
    color: "#222",
  },
  button: {
    background: "#e23744",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default SearchBar;
