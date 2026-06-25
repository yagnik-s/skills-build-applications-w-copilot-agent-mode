"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const models_1 = require("../models");
const router = (0, express_1.Router)();
router.get('/', async (_req, res, next) => {
    try {
        const activities = await models_1.Activity.find().sort({ completedAt: -1 }).lean();
        res.json({ activities });
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
