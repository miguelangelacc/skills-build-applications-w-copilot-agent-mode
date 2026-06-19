"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activity = void 0;
const mongoose_1 = require("mongoose");
const activitySchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, enum: ['running', 'cycling', 'swimming', 'gym', 'other'] },
    duration: { type: Number, required: true },
    calories: { type: Number, required: true },
    distance: { type: Number },
    description: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
}, { timestamps: true });
exports.Activity = (0, mongoose_1.model)('Activity', activitySchema);
//# sourceMappingURL=Activity.js.map