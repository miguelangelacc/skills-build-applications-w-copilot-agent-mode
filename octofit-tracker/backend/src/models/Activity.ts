import { Schema, model, Types } from 'mongoose';

interface IActivity {
  _id?: string;
  user: Types.ObjectId;
  type: string;
  duration: number;
  calories: number;
  distance?: number;
  description: string;
  date: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, enum: ['running', 'cycling', 'swimming', 'gym', 'other'] },
    duration: { type: Number, required: true },
    calories: { type: Number, required: true },
    distance: { type: Number },
    description: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true }
);

export const Activity = model<IActivity>('Activity', activitySchema);
