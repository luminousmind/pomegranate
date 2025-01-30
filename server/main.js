const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

app.listen(PORT, function() {
    console.log("Server is running on port", PORT);
})