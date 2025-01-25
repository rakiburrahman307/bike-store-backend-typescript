import mongoose, { Schema, Model } from 'mongoose';
import { TUser } from './users.interface';

// Define the User schema
const userSchema: Schema<TUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Create and export the User model
const User: Model<TUser> = mongoose.model<TUser>('User', userSchema);
export default User;
