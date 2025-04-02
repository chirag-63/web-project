import mongoose from "mongoose";

const connectToDB = async () => {
  if (!process.env.DB_URL) {
    throw new Error("DB_URL environment variable is not set");
  }

  try {
    if (mongoose.connection.readyState === 1) {
      return mongoose.connection;
    }

    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database connected successfully");
    return mongoose.connection;
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
};

export default connectToDB;
