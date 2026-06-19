"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = void 0;
const mongoose_1 = require("mongoose");
const workoutSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: {
        type: String,
        required: true,
        enum: ['beginner', 'intermediate', 'advanced'],
    },
    duration: { type: Number, required: true },
    exercises: [
        {
            name: { type: String, required: true },
            sets: { type: Number, required: true },
            reps: { type: Number, required: true },
        },
    ],
    caloriesBurned: { type: Number, required: true },
}, { timestamps: true });
exports.Workout = (0, mongoose_1.model)('Workout', workoutSchema);
//# sourceMappingURL=Workout.js.map