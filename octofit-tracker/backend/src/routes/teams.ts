import { Router, Request, Response } from 'express';
import { Team } from '../models/Team';

const router = Router();

/**
 * GET /api/teams/
 * Retrieve all teams
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const teams = await Team.find()
      .populate('leader', 'username firstName lastName')
      .populate('members', 'username firstName lastName');
    res.json({
      message: 'Get all teams',
      data: teams,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching teams', error });
  }
});

/**
 * GET /api/teams/:id
 * Retrieve a specific team
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate('leader', 'username firstName lastName')
      .populate('members', 'username firstName lastName');
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json({
      message: `Get team ${req.params.id}`,
      data: team,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching team', error });
  }
});

/**
 * POST /api/teams/
 * Create a new team
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const newTeam = await Team.create(req.body);
    res.status(201).json({
      message: 'Team created',
      data: newTeam,
    });
  } catch (error) {
    res.status(400).json({ message: 'Error creating team', error });
  }
});

/**
 * PUT /api/teams/:id
 * Update a team
 */
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedTeam = await Team.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedTeam) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json({
      message: `Team ${req.params.id} updated`,
      data: updatedTeam,
    });
  } catch (error) {
    res.status(400).json({ message: 'Error updating team', error });
  }
});

/**
 * DELETE /api/teams/:id
 * Delete a team
 */
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deletedTeam = await Team.findByIdAndDelete(req.params.id);
    if (!deletedTeam) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json({
      message: `Team ${req.params.id} deleted`,
      data: deletedTeam,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting team', error });
  }
});

export default router;
