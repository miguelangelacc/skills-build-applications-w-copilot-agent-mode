"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Activity_1 = require("../models/Activity");
const router = (0, express_1.Router)();
/**
 * GET /api/activities/
 * Retrieve all activities
 */
router.get('/', async (req, res) => {
    try {
        const activities = await Activity_1.Activity.find().populate('user', 'username firstName lastName');
        res.json({
            message: 'Get all activities',
            data: activities,
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching activities', error });
    }
});
/**
 * GET /api/activities/:id
 * Retrieve a specific activity
 */
router.get('/:id', async (req, res) => {
    try {
        const activity = await Activity_1.Activity.findById(req.params.id).populate('user', 'username firstName lastName');
        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }
        res.json({
            message: `Get activity ${req.params.id}`,
            data: activity,
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching activity', error });
    }
});
/**
 * POST /api/activities/
 * Log a new activity
 */
router.post('/', async (req, res) => {
    try {
        const newActivity = await Activity_1.Activity.create(req.body);
        res.status(201).json({
            message: 'Activity logged',
            data: newActivity,
        });
    }
    catch (error) {
        res.status(400).json({ message: 'Error creating activity', error });
    }
});
/**
 * PUT /api/activities/:id
 * Update an activity
 */
router.put('/:id', async (req, res) => {
    try {
        const updatedActivity = await Activity_1.Activity.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updatedActivity) {
            return res.status(404).json({ message: 'Activity not found' });
        }
        res.json({
            message: `Activity ${req.params.id} updated`,
            data: updatedActivity,
        });
    }
    catch (error) {
        res.status(400).json({ message: 'Error updating activity', error });
    }
});
/**
 * DELETE /api/activities/:id
 * Delete an activity
 */
router.delete('/:id', async (req, res) => {
    try {
        const deletedActivity = await Activity_1.Activity.findByIdAndDelete(req.params.id);
        if (!deletedActivity) {
            return res.status(404).json({ message: 'Activity not found' });
        }
        res.json({
            message: `Activity ${req.params.id} deleted`,
            data: deletedActivity,
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting activity', error });
    }
});
exports.default = router;
//# sourceMappingURL=activities.js.map