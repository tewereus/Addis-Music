import mongoose from "mongoose";

const connnectDB = async (req, res) => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database connected successfully");
  } catch (error) {
    console.log(`Database Error`);
  }
};

export default connnectDB;
