const mongoose = require("mongoose");

// mongodb+srv://dev:narayansevak@dev.f0hct.mongodb.net/mybook
const connectDB = async () => {
  try {
    // Connect to the MongoDB database using Mongoose
    await mongoose.connect(process.env.MONGODBURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");

    // Get all collections in the database
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();

    // Print collection names
    console.log("Collections in the database:");
    collections.forEach((collection) => {
      console.log(collection.name);
    });
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1); // Exit the process if there is a connection error
  }
};

module.exports = connectDB;
