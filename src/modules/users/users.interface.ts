import { Document } from "mongoose";

export interface TUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'customer' | 'admin';
}
