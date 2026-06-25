"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const activities_1 = __importDefault(require("./routes/activities"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const teams_1 = __importDefault(require("./routes/teams"));
const users_1 = __importDefault(require("./routes/users"));
const workouts_1 = __importDefault(require("./routes/workouts"));
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 8000;
const HOST = process.env.HOST || '0.0.0.0';
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${PORT}`;
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', baseUrl });
});
app.use('/api/users', users_1.default);
app.use('/api/teams', teams_1.default);
app.use('/api/activities', activities_1.default);
app.use('/api/leaderboard', leaderboard_1.default);
app.use('/api/workouts', workouts_1.default);
async function start() {
    try {
        await (0, database_1.connectDatabase)();
        console.log(`Connected to MongoDB at ${database_1.MONGODB_URI}`);
        app.listen(PORT, HOST, () => {
            console.log(`Backend listening on ${baseUrl}`);
        });
    }
    catch (error) {
        console.error('Failed to start backend', error);
        process.exit(1);
    }
}
void start();
