const express = require("express");
const session = require("express-session");
const { RedisStore } = require("connect-redis");
const redisClient = require("./config/redisClient");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    name: "session_id",
    secret: process.env.SESSION_SECRET || "your_secret_key",
    store: new RedisStore({ client: redisClient }),
    saveUninitialized: false,
    resave: false,
    cookie: {
      secure: process.env.NODE_ENV == "production",
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

app.listen(PORT, function () {
  console.log("Server is running on port", PORT);
});
