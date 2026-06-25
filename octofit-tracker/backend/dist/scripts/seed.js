"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const models_1 = require("../models");
async function seed() {
    console.log('Seed the octofit_db database with test data');
    await (0, database_1.connectDatabase)();
    await Promise.all([
        models_1.User.deleteMany({}),
        models_1.Team.deleteMany({}),
        models_1.Activity.deleteMany({}),
        models_1.LeaderboardEntry.deleteMany({}),
        models_1.Workout.deleteMany({}),
    ]);
    await models_1.Team.insertMany([
        {
            name: 'Trail Blazers',
            motto: 'Every mile counts',
            memberCount: 12,
            weeklyMinutes: 1840,
        },
        {
            name: 'Core Crushers',
            motto: 'Stronger together',
            memberCount: 9,
            weeklyMinutes: 1515,
        },
        {
            name: 'Cardio Crew',
            motto: 'Keep the heart in motion',
            memberCount: 11,
            weeklyMinutes: 1690,
        },
    ]);
    await models_1.User.insertMany([
        {
            name: 'Maya Patel',
            email: 'maya.patel@example.com',
            team: 'Trail Blazers',
            role: 'Team Captain',
            weeklyGoalMinutes: 300,
        },
        {
            name: 'Jordan Lee',
            email: 'jordan.lee@example.com',
            team: 'Core Crushers',
            role: 'Member',
            weeklyGoalMinutes: 240,
        },
        {
            name: 'Sam Rivera',
            email: 'sam.rivera@example.com',
            team: 'Cardio Crew',
            role: 'Member',
            weeklyGoalMinutes: 275,
        },
    ]);
    await models_1.Activity.insertMany([
        {
            userEmail: 'maya.patel@example.com',
            activityType: 'Trail Run',
            durationMinutes: 52,
            caloriesBurned: 510,
            completedAt: new Date('2026-06-24T13:30:00.000Z'),
        },
        {
            userEmail: 'jordan.lee@example.com',
            activityType: 'Strength Training',
            durationMinutes: 45,
            caloriesBurned: 360,
            completedAt: new Date('2026-06-25T18:15:00.000Z'),
        },
        {
            userEmail: 'sam.rivera@example.com',
            activityType: 'Cycling',
            durationMinutes: 61,
            caloriesBurned: 640,
            completedAt: new Date('2026-06-26T12:00:00.000Z'),
        },
    ]);
    await models_1.LeaderboardEntry.insertMany([
        {
            rank: 1,
            userName: 'Maya Patel',
            teamName: 'Trail Blazers',
            points: 1240,
        },
        {
            rank: 2,
            userName: 'Sam Rivera',
            teamName: 'Cardio Crew',
            points: 1175,
        },
        {
            rank: 3,
            userName: 'Jordan Lee',
            teamName: 'Core Crushers',
            points: 1085,
        },
    ]);
    await models_1.Workout.insertMany([
        {
            title: 'Morning Mobility Reset',
            focusArea: 'Flexibility',
            difficulty: 'Beginner',
            durationMinutes: 20,
            suggestedFor: 'Recovery days and new members',
        },
        {
            title: 'Hill Sprint Builder',
            focusArea: 'Cardio',
            difficulty: 'Advanced',
            durationMinutes: 35,
            suggestedFor: 'Trail Blazers endurance training',
        },
        {
            title: 'Full-Body Strength Circuit',
            focusArea: 'Strength',
            difficulty: 'Intermediate',
            durationMinutes: 40,
            suggestedFor: 'Core Crushers weekly challenge',
        },
    ]);
    console.log('Seed data inserted successfully');
}
seed()
    .catch((error) => {
    console.error('Seed failed', error);
    process.exitCode = 1;
})
    .finally(async () => {
    await (0, database_1.disconnectDatabase)();
});
