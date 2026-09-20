const express = require("express");
const dotenv = require("dotenv");
const cookieparser = require("cookie-parser");
const cors = require("cors");

const databaseconnection = require("./utils/Database");
const userRoute = require("./routes/userRoute");

dotenv.config({
    path: ".env"
});

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieparser());

app.use(
    cors({
        origin:"https://netflix-clone-ziip.onrender.com",
        credentials: true,
    })
);

// Routes
app.use("/api/v1/user", userRoute);

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});

// Database
databaseconnection();