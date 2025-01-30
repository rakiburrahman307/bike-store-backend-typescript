import { Document } from "mongoose";

export interface TUser extends Document {
  name: string;
  address?: string;
  phone: string;
  email: string;
  password: string;
  role: 'customer' | 'admin';
}
