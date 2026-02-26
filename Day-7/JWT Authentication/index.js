
const express = require("express");
const cookieParser = require("cookie-parser");
const { connectToDB } = require("./connection");
const { restrictToLoggedInUser , checkAuth} = require("./middleware/auth");
const URL = require("./models/url");

const app = express();
const PORT = 3000;

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {

});

// Set Content Security Policy headers to allow required resources
app.use((req, res, next) => {
        res.setHeader(
                "Content-Security-Policy",
                "default-src 'self'; connect-src 'self' http://localhost:3000; font-src 'self' https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; script-src 'self' 'unsafe-inline'; img-src 'self' data:;"
        );
        next();
});

app.use("/url", restrictToLoggedInUser, urlRoute);
app.use("/", checkAuth, staticRoute);
app.use("/user",  userRoute);

app.get("/:shortId", async (req, res) => {
    const { shortId } = req.params;

    const entry = await URL.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        }
    );

    if (!entry) {
        return res.status(404).send("Short URL not found");
    }

    res.redirect(entry.redirectURL);
});
     


connectToDB("mongodb://127.0.0.1:27017/short-url")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB connection error:", err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});