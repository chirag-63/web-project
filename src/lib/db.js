const mongoose = require('mongoose')
require("dotenv").config();

const connectToDB = async () => {
  if (process.env.DB_URL) {
    try {
      await mongoose.connect(process.env.DB_URL);
      console.log("Database connected");
    } catch (error) {
      console.error("Database connection error:", error);
    }
  } else {
    console.error("Cant connect to database, DB_URL not set");
  }
};

module.exports = connectToDB;