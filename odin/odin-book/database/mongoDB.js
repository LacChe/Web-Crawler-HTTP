import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

export async function connectDB() {
    await mongoose.connect(process.env.MONGO_DB_URI, { useUnifiedTopology: true, useNewUrlParser: true });
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "mongo connection error"));
}