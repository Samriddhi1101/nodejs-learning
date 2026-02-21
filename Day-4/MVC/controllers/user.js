const express = require('express');

const User = require('../models/user');

async function handleGetallUsers(req, res) {
    const allDbUsers = await User.find();
    return res.json(allDbUsers);
}

async function handleGetUserById(req, res) {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
}

async function handleUpdateUserById(req, res) {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
}

async function handleDeleteUserById(req, res) {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
}

module.exports ={

}
module.exports = {
    
    handleGetallUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById
}