const mongoose = require("mongoose");
require("dotenv").config()
const dns=require("dns")
dns.setServers(["1.1.1.1","8.8.8.8"])

const connectDatabase = async () => {
  try {
    const mongoURL = process.env.MONGODB_URL;

    if (!mongoURL) {
      console.error("❌ MONGODB_URL not found in .env file");
      return false;
    }

    await mongoose.connect(mongoURL, { serverSelectionTimeoutMS: 10000 });

    console.log(" MongoDB Connected Successfully");
    return true;

  } catch (error) {
    console.error(" MongoDB Connection Failed:", error.message);
    return false;
  }
};

module.exports = connectDatabase;
