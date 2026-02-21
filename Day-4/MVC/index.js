const express = require('express');
const PORT = 8000;
const { connectDB } = require('./connection');

const {logReqRes} = require('./middleware')

const userRouter = require('./routes/user');

const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json());

//middleware plugin
app.use(logReqRes("log.txt"));

// Connection
connectDB("mongodb://localhost:27017/mini-project01")

//Routes
app.use("/api/users" , userRouter)


app.listen(PORT, () => {
    console.log('server is working on port', PORT);
})