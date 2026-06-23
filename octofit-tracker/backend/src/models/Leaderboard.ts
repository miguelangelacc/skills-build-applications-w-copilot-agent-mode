import { Schema, model, Types } from 'mongoose';

interface ILeaderboard {
  _id?: string;
  entity: 'user' | 'team';
  entityId: Types.ObjectId;
  score: number;
  rank: number;
  totalActivities: number;
  totalCalories: number;
  updatedAt?: Date;
}

const leaderboardSchema = new Schema<ILeaderboard>(
  {
    entity: { type: String, required: true, enum: ['user', 'team'] },
    entityId: { type: Schema.Types.ObjectId, required: true, refPath: 'entity' },
    score: { type: Number, required: true, default: 0 },
    rank: { type: Number, required: true },
    totalActivities: { type: Number, required: true, default: 0 },
    totalCalories: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

leaderboardSchema.index({ score: -1, rank: 1 });

export const Leaderboard = model<ILeaderboard>('Leaderboard', leaderboardSchema);
