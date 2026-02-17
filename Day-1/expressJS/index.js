const http = require('http');
const express = require('express');

const app =  express();

app.get('/', (req, res) => {       
    res.send('Hello from the Home Page');
})

app.get('/about', (req, res) => {
    res.send('Hello from the About Page');
})

app.get('/contact', (req, res) => {
    res.send('Hello from the Contact Page');
})

const myServer = http.createServer(app);
myServer.listen(8000, () => {
    console.log('Server is running');
})