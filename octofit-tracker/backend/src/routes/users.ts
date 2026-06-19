import { Router, Request, Response } from 'express';
import { User } from '../models/User';

const router = Router();

/**
 * GET /api/users/
 * Retrieve all users
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password');
    res.json({
      message: 'Get all users',
      data: users,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
});

/**
 * GET /api/users/:id
 * Retrieve a specific user
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      message: `Get user ${req.params.id}`,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
});

/**
 * POST /api/users/
 * Create a new user
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({
      message: 'User created',
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error });
  }
});

/**
 * PUT /api/users/:id
 * Update a user
 */
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      message: `User ${req.params.id} updated`,
      data: updatedUser,
    });
  } catch (error) {
    res.status(400).json({ message: 'Error updating user', error });
  }
});

/**
 * DELETE /api/users/:id
 * Delete a user
 */
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      message: `User ${req.params.id} deleted`,
      data: deletedUser,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
});

export default router;
