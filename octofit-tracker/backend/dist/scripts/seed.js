"use strict";
/**
 * Seed the octofit_db database with test data
 *
 * Usage: npm run seed
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = require("../models/User");
const Team_1 = require("../models/Team");
const Activity_1 = require("../models/Activity");
const Leaderboard_1 = require("../models/Leaderboard");
const Workout_1 = require("../models/Workout");
dotenv_1.default.config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
async function seedDatabase() {
    try {
        console.log('🌱 Seeding the octofit_db database with test data...\n');
        // Connect to MongoDB
        await mongoose_1.default.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');
        // Clear existing data
        await Promise.all([
            User_1.User.deleteMany({}),
            Team_1.Team.deleteMany({}),
            Activity_1.Activity.deleteMany({}),
            Leaderboard_1.Leaderboard.deleteMany({}),
            Workout_1.Workout.deleteMany({}),
        ]);
        console.log('🗑️  Cleared existing collections\n');
        // Seed Users
        const users = await User_1.User.insertMany([
            {
                username: 'alice_runner',
                email: 'alice@example.com',
                password: 'hashed_password_1',
                firstName: 'Alice',
                lastName: 'Runner',
                profilePicture: 'https://avatar.example.com/alice',
            },
            {
                username: 'bob_cyclist',
                email: 'bob@example.com',
                password: 'hashed_password_2',
                firstName: 'Bob',
                lastName: 'Cyclist',
                profilePicture: 'https://avatar.example.com/bob',
            },
            {
                username: 'charlie_swimmer',
                email: 'charlie@example.com',
                password: 'hashed_password_3',
                firstName: 'Charlie',
                lastName: 'Swimmer',
                profilePicture: 'https://avatar.example.com/charlie',
            },
            {
                username: 'diana_lifter',
                email: 'diana@example.com',
                password: 'hashed_password_4',
                firstName: 'Diana',
                lastName: 'Lifter',
                profilePicture: 'https://avatar.example.com/diana',
            },
            {
                username: 'evan_trainer',
                email: 'evan@example.com',
                password: 'hashed_password_5',
                firstName: 'Evan',
                lastName: 'Trainer',
                profilePicture: 'https://avatar.example.com/evan',
            },
        ]);
        console.log(`✅ Created ${users.length} users\n`);
        // Seed Teams
        const teams = await Team_1.Team.insertMany([
            {
                name: 'Iron Titans',
                description: 'A team dedicated to strength training and fitness',
                leader: users[0]._id,
                members: [users[0]._id, users[1]._id, users[3]._id],
            },
            {
                name: 'Cardio Kings',
                description: 'Focused on running and cardiovascular health',
                leader: users[1]._id,
                members: [users[1]._id, users[2]._id],
            },
            {
                name: 'All-Around Athletes',
                description: 'Balanced fitness with all types of activities',
                leader: users[4]._id,
                members: [users[4]._id, users[0]._id, users[2]._id],
            },
        ]);
        console.log(`✅ Created ${teams.length} teams\n`);
        // Seed Activities
        const activities = await Activity_1.Activity.insertMany([
            {
                user: users[0]._id,
                type: 'running',
                duration: 45,
                calories: 550,
                distance: 8.5,
                description: 'Morning jog in the park',
                date: new Date('2026-06-19'),
            },
            {
                user: users[0]._id,
                type: 'gym',
                duration: 60,
                calories: 450,
                description: 'Weight lifting session',
                date: new Date('2026-06-18'),
            },
            {
                user: users[1]._id,
                type: 'cycling',
                duration: 90,
                calories: 700,
                distance: 35,
                description: 'Long bike ride on mountain trail',
                date: new Date('2026-06-19'),
            },
            {
                user: users[2]._id,
                type: 'swimming',
                duration: 45,
                calories: 500,
                distance: 2,
                description: 'Swimming laps at the pool',
                date: new Date('2026-06-17'),
            },
            {
                user: users[3]._id,
                type: 'gym',
                duration: 75,
                calories: 600,
                description: 'Powerlifting training',
                date: new Date('2026-06-19'),
            },
            {
                user: users[4]._id,
                type: 'running',
                duration: 30,
                calories: 400,
                distance: 5,
                description: 'Quick cardio session',
                date: new Date('2026-06-16'),
            },
        ]);
        console.log(`✅ Created ${activities.length} activities\n`);
        // Seed Workouts
        const workouts = await Workout_1.Workout.insertMany([
            {
                name: 'Beginner Full Body',
                description: 'A beginner-friendly full-body workout',
                difficulty: 'beginner',
                duration: 45,
                exercises: [
                    { name: 'Push-ups', sets: 3, reps: 10 },
                    { name: 'Squats', sets: 3, reps: 15 },
                    { name: 'Planks', sets: 3, reps: 30 },
                ],
                caloriesBurned: 250,
            },
            {
                name: 'Intermediate HIIT',
                description: 'High-intensity interval training',
                difficulty: 'intermediate',
                duration: 30,
                exercises: [
                    { name: 'Burpees', sets: 4, reps: 15 },
                    { name: 'Mountain Climbers', sets: 4, reps: 20 },
                    { name: 'Jump Squats', sets: 4, reps: 15 },
                ],
                caloriesBurned: 350,
            },
            {
                name: 'Advanced Strength',
                description: 'Advanced strength training for experienced lifters',
                difficulty: 'advanced',
                duration: 90,
                exercises: [
                    { name: 'Deadlifts', sets: 5, reps: 5 },
                    { name: 'Bench Press', sets: 5, reps: 5 },
                    { name: 'Squats', sets: 5, reps: 5 },
                ],
                caloriesBurned: 500,
            },
            {
                name: 'Cardio Blast',
                description: 'Fast-paced cardio workout',
                difficulty: 'intermediate',
                duration: 45,
                exercises: [
                    { name: 'Jumping Jacks', sets: 3, reps: 50 },
                    { name: 'Running in Place', sets: 3, reps: 60 },
                    { name: 'High Knees', sets: 3, reps: 30 },
                ],
                caloriesBurned: 400,
            },
        ]);
        console.log(`✅ Created ${workouts.length} workouts\n`);
        // Seed Leaderboard (based on activities and calories)
        const leaderboardData = await Promise.all([
            { entity: 'user', entityId: users[0]._id, rank: 1, totalActivities: 2, totalCalories: 1000 },
            { entity: 'user', entityId: users[1]._id, rank: 2, totalActivities: 1, totalCalories: 700 },
            { entity: 'user', entityId: users[3]._id, rank: 3, totalActivities: 1, totalCalories: 600 },
            { entity: 'user', entityId: users[2]._id, rank: 4, totalActivities: 1, totalCalories: 500 },
            { entity: 'user', entityId: users[4]._id, rank: 5, totalActivities: 1, totalCalories: 400 },
            { entity: 'team', entityId: teams[0]._id, rank: 1, totalActivities: 4, totalCalories: 2200 },
            { entity: 'team', entityId: teams[1]._id, rank: 2, totalActivities: 2, totalCalories: 1200 },
            { entity: 'team', entityId: teams[2]._id, rank: 3, totalActivities: 3, totalCalories: 1900 },
        ]);
        const leaderboard = await Leaderboard_1.Leaderboard.insertMany(leaderboardData.map((item) => ({
            ...item,
            score: item.totalCalories,
        })));
        console.log(`✅ Created ${leaderboard.length} leaderboard entries\n`);
        // Verify data
        console.log('📊 Data Verification:\n');
        console.log(`   Users: ${await User_1.User.countDocuments()} documents`);
        console.log(`   Teams: ${await Team_1.Team.countDocuments()} documents`);
        console.log(`   Activities: ${await Activity_1.Activity.countDocuments()} documents`);
        console.log(`   Workouts: ${await Workout_1.Workout.countDocuments()} documents`);
        console.log(`   Leaderboard: ${await Leaderboard_1.Leaderboard.countDocuments()} documents\n`);
        console.log('✨ Database seeding completed successfully!\n');
        process.exit(0);
    }
    catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
//# sourceMappingURL=seed.js.map