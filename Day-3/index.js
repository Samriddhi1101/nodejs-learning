const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json());

// Connect to mongoDB
mongoose.connect('mongodb://127.0.0.1:27017/PracticeDB')
    .then(() => console.log('DB connected successfully'))
    .catch((err) => console.log('DB connection error: ', err))

//Schema
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },

    email : {
        type: String,
        required: true,
        unique: true
    }
} , {timestamps: true})

//Model
const User = mongoose.model('User' , UserSchema)

// Routes

// Get Routes

app.get('/users' , async(req , res) => {
    const db = await User.find({})
    const html = `
    <ul>
        ${db.map(user => `<li>${user.firstName} ${user.lastName} - ${user.email}</li>`).join('')}
    </ul>`
    res.send(html)
})

// Post Routes

app.post('/create_user' , async(req , res)=> {
    
    const result = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    })

    console.log(result)
    return res.status(201).json({ "msg": "User created successfully" })

})



app.listen(8000, () => {
    console.log('server is working on port 8000');
})