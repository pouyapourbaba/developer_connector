const mongoose = require("mongoose");
const config = require("config");
const dbURI = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });
    console.log("MongoDB Connected...");
  } catch (ex) {
    console.error(ex.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
