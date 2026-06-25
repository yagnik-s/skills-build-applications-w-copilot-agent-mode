"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const models_1 = require("../models");
const router = (0, express_1.Router)();
router.get('/', async (_req, res, next) => {
    try {
        const workouts = await models_1.Workout.find().sort({ difficulty: 1, title: 1 }).lean();
        res.json({ workouts });
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
