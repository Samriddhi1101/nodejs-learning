const express = require("express");
const urlRoute = require("./routes/url");
const { connectToDB } = require("./connection");

const app = express();
const PORT = 8001;

app.use(express.json());
app.use("/url", urlRoute);

connectToDB("mongodb://127.0.0.1:27017/short-url")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB connection error:", err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});