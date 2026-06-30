import express from 'express';
import { connectDatabase, MONGODB_URI } from './config/database';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import teamsRouter from './routes/teams';
import usersRouter from './routes/users';
import workoutsRouter from './routes/workouts';

export const app = express();
export const PORT = Number(process.env.PORT) || 8000;
export const HOST = process.env.HOST || '0.0.0.0';

const CODESPACE_NAME = process.env.CODESPACE_NAME;
export const baseUrl = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', baseUrl });
});

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

export async function startServer(): Promise<void> {
  try {
    await connectDatabase();
    console.log(`Connected to MongoDB at ${MONGODB_URI}`);

    app.listen(PORT, HOST, () => {
      console.log(`Backend listening on ${baseUrl}`);
    });
  } catch (error) {
    console.error('Failed to start backend', error);
    process.exit(1);
  }
}
