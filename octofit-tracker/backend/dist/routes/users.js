"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../models/User");
const router = (0, express_1.Router)();
/**
 * GET /api/users/
 * Retrieve all users
 */
router.get('/', async (req, res) => {
    try {
        const users = await User_1.User.find().select('-password');
        res.json({
            message: 'Get all users',
            data: users,
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});
/**
 * GET /api/users/:id
 * Retrieve a specific user
 */
router.get('/:id', async (req, res) => {
    try {
        const user = await User_1.User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({
            message: `Get user ${req.params.id}`,
            data: user,
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
});
/**
 * POST /api/users/
 * Create a new user
 */
router.post('/', async (req, res) => {
    try {
        const newUser = await User_1.User.create(req.body);
        res.status(201).json({
            message: 'User created',
            data: newUser,
        });
    }
    catch (error) {
        res.status(400).json({ message: 'Error creating user', error });
    }
});
/**
 * PUT /api/users/:id
 * Update a user
 */
router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User_1.User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({
            message: `User ${req.params.id} updated`,
            data: updatedUser,
        });
    }
    catch (error) {
        res.status(400).json({ message: 'Error updating user', error });
    }
});
/**
 * DELETE /api/users/:id
 * Delete a user
 */
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User_1.User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({
            message: `User ${req.params.id} deleted`,
            data: deletedUser,
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
});
exports.default = router;
//# sourceMappingURL=users.js.map