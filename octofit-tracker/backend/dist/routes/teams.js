"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Team_1 = require("../models/Team");
const router = (0, express_1.Router)();
/**
 * GET /api/teams/
 * Retrieve all teams
 */
router.get('/', async (req, res) => {
    try {
        const teams = await Team_1.Team.find()
            .populate('leader', 'username firstName lastName')
            .populate('members', 'username firstName lastName');
        res.json({
            message: 'Get all teams',
            data: teams,
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching teams', error });
    }
});
/**
 * GET /api/teams/:id
 * Retrieve a specific team
 */
router.get('/:id', async (req, res) => {
    try {
        const team = await Team_1.Team.findById(req.params.id)
            .populate('leader', 'username firstName lastName')
            .populate('members', 'username firstName lastName');
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }
        res.json({
            message: `Get team ${req.params.id}`,
            data: team,
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching team', error });
    }
});
/**
 * POST /api/teams/
 * Create a new team
 */
router.post('/', async (req, res) => {
    try {
        const newTeam = await Team_1.Team.create(req.body);
        res.status(201).json({
            message: 'Team created',
            data: newTeam,
        });
    }
    catch (error) {
        res.status(400).json({ message: 'Error creating team', error });
    }
});
/**
 * PUT /api/teams/:id
 * Update a team
 */
router.put('/:id', async (req, res) => {
    try {
        const updatedTeam = await Team_1.Team.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updatedTeam) {
            return res.status(404).json({ message: 'Team not found' });
        }
        res.json({
            message: `Team ${req.params.id} updated`,
            data: updatedTeam,
        });
    }
    catch (error) {
        res.status(400).json({ message: 'Error updating team', error });
    }
});
/**
 * DELETE /api/teams/:id
 * Delete a team
 */
router.delete('/:id', async (req, res) => {
    try {
        const deletedTeam = await Team_1.Team.findByIdAndDelete(req.params.id);
        if (!deletedTeam) {
            return res.status(404).json({ message: 'Team not found' });
        }
        res.json({
            message: `Team ${req.params.id} deleted`,
            data: deletedTeam,
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting team', error });
    }
});
exports.default = router;
//# sourceMappingURL=teams.js.map