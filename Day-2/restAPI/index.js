const express = require('express')
const users = require('./MOCK_DATA.json')
const fs = require('fs')

const app = express()

app.use(express.urlencoded({extended : false}))

//Rest API routes

app.get("/" , (req , res) => {
    res.end("Welcome to Home Page+")
})


app.get("/users" , (req , res) => {
    const html = users.map(user => `<li>${user.first_name} ${user.last_name}</li>`).join("")
    res.send(`<ul>${html}</ul>`)
})

app.get("/api/users" , (req , res) => {
    res.json(users)
})

app.get("/api/users/:id" , (req , res) => {
    const id = Number(req.params.id)
    const user = users.find(user => user.id === id)
    return res.json(user)
})

app.post("/api/newuser" , (req , res) => {
    const body = req.body
    fs.writeFile("MOCK_DATA.json" , JSON.stringify([...users , {id: users.length + 1 , ...body}]) , (err) => {
        if(err) {
            res.status(500).json({message : "Error creating user"})
        } else {
            res.status(201).json({message : "User created successfully" , id: users.length + 1})
        }
    })
})

app.patch("/api/updateuser/:id" , (req , res) => {
    const {id} = req.params
    res.json({message : `User with id ${id} updated successfully`})
})

app.delete("/api/deluser/:id" , (req , res) => {
    const {id} = req.params
    res.json({message : `User with id ${id} deleted successfully`})
})

app.listen(8000 , () => {console.log("Server is running....")})