import { Router } from 'express';
import { LeaderboardEntry } from '../models';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const leaderboard = await LeaderboardEntry.find().sort({ rank: 1 }).lean();
    res.json({ leaderboard });
  } catch (error) {
    next(error);
  }
});

export default router;
