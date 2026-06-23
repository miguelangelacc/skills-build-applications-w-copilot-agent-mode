import { Schema, model, Types } from 'mongoose';

interface IWorkout {
  _id?: string;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  exercises: Array<{
    name: string;
    sets: number;
    reps: number;
  }>;
  caloriesBurned: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
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
  },
  { timestamps: true }
);

export const Workout = model<IWorkout>('Workout', workoutSchema);
