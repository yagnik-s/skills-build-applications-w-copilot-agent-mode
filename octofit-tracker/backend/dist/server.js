"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseUrl = exports.HOST = exports.PORT = exports.app = void 0;
exports.startServer = startServer;
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const activities_1 = __importDefault(require("./routes/activities"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const teams_1 = __importDefault(require("./routes/teams"));
const users_1 = __importDefault(require("./routes/users"));
const workouts_1 = __importDefault(require("./routes/workouts"));
exports.app = (0, express_1.default)();
exports.PORT = Number(process.env.PORT) || 8000;
exports.HOST = process.env.HOST || '0.0.0.0';
const CODESPACE_NAME = process.env.CODESPACE_NAME;
exports.baseUrl = CODESPACE_NAME
    ? `https://${CODESPACE_NAME}-8000.app.github.dev`
    : `http://localhost:${exports.PORT}`;
exports.app.use(express_1.default.json());
exports.app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', baseUrl: exports.baseUrl });
});
exports.app.use('/api/users', users_1.default);
exports.app.use('/api/teams', teams_1.default);
exports.app.use('/api/activities', activities_1.default);
exports.app.use('/api/leaderboard', leaderboard_1.default);
exports.app.use('/api/workouts', workouts_1.default);
async function startServer() {
    try {
        await (0, database_1.connectDatabase)();
        console.log(`Connected to MongoDB at ${database_1.MONGODB_URI}`);
        exports.app.listen(exports.PORT, exports.HOST, () => {
            console.log(`Backend listening on ${exports.baseUrl}`);
        });
    }
    catch (error) {
        console.error('Failed to start backend', error);
        process.exit(1);
    }
}
