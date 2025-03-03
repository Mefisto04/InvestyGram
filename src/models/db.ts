import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_CONN || "";

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    try {
        await mongoose.connect(MONGO_URI, {
            dbName: "yourDatabaseName",
        });
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw new Error("Database connection failed");
    }
};

export default connectDB;
