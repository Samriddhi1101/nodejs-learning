
const express = require('express');
const {
  handleGetallUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById
} = require('../controllers/user');

const router = express.Router();

// Routes
router.get('/all' , handleGetallUsers)


router
.route('/:id')
.get (handleGetUserById)

.patch (handleUpdateUserById)

.delete (handleDeleteUserById)

router.post ('/', async(req, res) => {
    const body = req.body;
    if (
        !body.firstName ||
        !body.lastName ||
        !body.email ||  
        typeof body.firstName !== 'string' ||
        typeof body.lastName !== 'string' ||
        typeof body.email !== 'string'
    )
    return res.status(400).json({ error: "All fields are required" });
})

module.exports = router;
   
    

  

 