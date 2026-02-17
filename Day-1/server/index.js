const http = require("http");
const fs = require ("fs");


const myServer = http.createServer((req, res) => {
    switch (req.url) {
        case "/": res.end("This is the home page");
        break
        case "/about": res.end("I am Samriddhi Bhardwaj");
        break
        default: res.end("404 Not Found");
    }

});
             
    console.log("New req rec.");
    

myServer.listen(3000, () => console.log("Server is running"));