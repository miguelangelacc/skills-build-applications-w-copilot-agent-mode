"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Workout_1 = require("../models/Workout");
const router = (0, express_1.Router)();
/**
 * GET /api/workouts/
 * Retrieve all workouts
 */
router.get('/', async (req, res) => {
    try {
        const workouts = await Workout_1.Workout.find();
        res.json({
            message: 'Get all workouts',
            data: workouts,
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching workouts', error });
    }
});
/**
 * GET /api/workouts/:id
 * Retrieve a specific workout
 */
router.get('/:id', async (req, res) => {
    try {
        const workout = await Workout_1.Workout.findById(req.params.id);
        if (!workout) {
            return res.status(404).json({ message: 'Workout not found' });
        }
        res.json({
            message: `Get workout ${req.params.id}`,
            data: workout,
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching workout', error });
    }
});
/**
 * POST /api/workouts/
 * Create a new workout
 */
router.post('/', async (req, res) => {
    try {
        const newWorkout = await Workout_1.Workout.create(req.body);
        res.status(201).json({
            message: 'Workout created',
            data: newWorkout,
        });
    }
    catch (error) {
        res.status(400).json({ message: 'Error creating workout', error });
    }
});
/**
 * PUT /api/workouts/:id
 * Update a workout
 */
router.put('/:id', async (req, res) => {
    try {
        const updatedWorkout = await Workout_1.Workout.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updatedWorkout) {
            return res.status(404).json({ message: 'Workout not found' });
        }
        res.json({
            message: `Workout ${req.params.id} updated`,
            data: updatedWorkout,
        });
    }
    catch (error) {
        res.status(400).json({ message: 'Error updating workout', error });
    }
});
/**
 * DELETE /api/workouts/:id
 * Delete a workout
 */
router.delete('/:id', async (req, res) => {
    try {
        const deletedWorkout = await Workout_1.Workout.findByIdAndDelete(req.params.id);
        if (!deletedWorkout) {
            return res.status(404).json({ message: 'Workout not found' });
        }
        res.json({
            message: `Workout ${req.params.id} deleted`,
            data: deletedWorkout,
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting workout', error });
    }
});
/**
 * GET /api/workouts/recommendations/:userId
 * Get personalized workout suggestions
 */
router.get('/recommendations/:userId', async (req, res) => {
    try {
        const recommendations = await Workout_1.Workout.find({}).limit(3);
        res.json({
            message: `Get workout recommendations for user ${req.params.userId}`,
            data: recommendations,
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching recommendations', error });
    }
});
exports.default = router;
//# sourceMappingURL=workouts.js.map