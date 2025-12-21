const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

const allowedOrigins = [
    "http://localhost:5173",                // Local Dev
    "https://your-frontend.vercel.app"     // Production
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true); // Postman / server-side requests
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'CORS policy: This origin is not allowed';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}));


// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/posts", require("./routes/posts"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
