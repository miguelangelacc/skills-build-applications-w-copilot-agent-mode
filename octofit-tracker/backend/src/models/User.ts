import { Schema, model } from 'mongoose';

interface IUser {
  _id?: string;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    profilePicture: { type: String },
  },
  { timestamps: true }
);

export const User = model<IUser>('User', userSchema);
