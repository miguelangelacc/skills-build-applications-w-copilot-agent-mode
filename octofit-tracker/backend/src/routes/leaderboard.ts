import { Router, Request, Response } from 'express';
import { Leaderboard } from '../models/Leaderboard';

const router = Router();

/**
 * GET /api/leaderboard/
 * Retrieve global leaderboard
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const leaderboard = await Leaderboard.find()
      .sort({ rank: 1 })
      .populate('entityId', 'username firstName lastName name');
    res.json({
      message: 'Get global leaderboard',
      data: leaderboard,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leaderboard', error });
  }
});

/**
 * GET /api/leaderboard/teams
 * Retrieve team leaderboard
 */
router.get('/teams', async (req: Request, res: Response) => {
  try {
    const teamLeaderboard = await Leaderboard.find({ entity: 'team' })
      .sort({ rank: 1 })
      .populate('entityId', 'name description');
    res.json({
      message: 'Get team leaderboard',
      data: teamLeaderboard,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching team leaderboard', error });
  }
});

/**
 * GET /api/leaderboard/users
 * Retrieve user leaderboard
 */
router.get('/users', async (req: Request, res: Response) => {
  try {
    const userLeaderboard = await Leaderboard.find({ entity: 'user' })
      .sort({ rank: 1 })
      .populate('entityId', 'username firstName lastName');
    res.json({
      message: 'Get user leaderboard',
      data: userLeaderboard,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user leaderboard', error });
  }
});

/**
 * GET /api/leaderboard/:id
 * Retrieve leaderboard for a specific entity
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const entry = await Leaderboard.findById(req.params.id).populate(
      'entityId',
      'username firstName lastName name description'
    );
    if (!entry) {
      return res.status(404).json({ message: 'Leaderboard entry not found' });
    }
    res.json({
      message: `Get leaderboard for ${req.params.id}`,
      data: entry,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leaderboard entry', error });
  }
});

export default router;
