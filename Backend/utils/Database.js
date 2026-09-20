const mongoose = require("mongoose");

const databaseconnection = async () => {
    console.log("Connecting to MongoDB...");

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000,
            tls: true,
            tlsAllowInvalidCertificates: true,
        });

        console.log("MongoDB Atlas connected successfully");

    } catch (error) {
        console.log("MongoDB connection failed:");
        console.log(error.message);
    }
};

module.exports = databaseconnection;