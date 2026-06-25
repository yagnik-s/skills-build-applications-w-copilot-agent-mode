"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = exports.LeaderboardEntry = exports.Activity = exports.Team = exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    team: { type: String, required: true },
    role: { type: String, required: true },
    weeklyGoalMinutes: { type: Number, required: true },
}, { timestamps: true });
const teamSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    motto: { type: String, required: true },
    memberCount: { type: Number, required: true },
    weeklyMinutes: { type: Number, required: true },
}, { timestamps: true });
const activitySchema = new mongoose_1.Schema({
    userEmail: { type: String, required: true },
    activityType: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    completedAt: { type: Date, required: true },
}, { timestamps: true });
const leaderboardSchema = new mongoose_1.Schema({
    rank: { type: Number, required: true },
    userName: { type: String, required: true },
    teamName: { type: String, required: true },
    points: { type: Number, required: true },
}, { timestamps: true });
const workoutSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    focusArea: { type: String, required: true },
    difficulty: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    suggestedFor: { type: String, required: true },
}, { timestamps: true });
exports.User = mongoose_1.models.User || (0, mongoose_1.model)('User', userSchema);
exports.Team = mongoose_1.models.Team || (0, mongoose_1.model)('Team', teamSchema);
exports.Activity = mongoose_1.models.Activity || (0, mongoose_1.model)('Activity', activitySchema);
exports.LeaderboardEntry = mongoose_1.models.LeaderboardEntry || (0, mongoose_1.model)('LeaderboardEntry', leaderboardSchema);
exports.Workout = mongoose_1.models.Workout || (0, mongoose_1.model)('Workout', workoutSchema);
