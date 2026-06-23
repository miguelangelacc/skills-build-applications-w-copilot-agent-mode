"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Leaderboard = void 0;
const mongoose_1 = require("mongoose");
const leaderboardSchema = new mongoose_1.Schema({
    entity: { type: String, required: true, enum: ['user', 'team'] },
    entityId: { type: mongoose_1.Schema.Types.ObjectId, required: true, refPath: 'entity' },
    score: { type: Number, required: true, default: 0 },
    rank: { type: Number, required: true },
    totalActivities: { type: Number, required: true, default: 0 },
    totalCalories: { type: Number, required: true, default: 0 },
}, { timestamps: true });
leaderboardSchema.index({ score: -1, rank: 1 });
exports.Leaderboard = (0, mongoose_1.model)('Leaderboard', leaderboardSchema);
//# sourceMappingURL=Leaderboard.js.map