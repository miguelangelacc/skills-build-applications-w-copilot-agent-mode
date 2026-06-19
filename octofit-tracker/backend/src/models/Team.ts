import { Schema, model, Types } from 'mongoose';

interface ITeam {
  _id?: string;
  name: string;
  description: string;
  leader: Types.ObjectId;
  members: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    leader: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

export const Team = model<ITeam>('Team', teamSchema);
