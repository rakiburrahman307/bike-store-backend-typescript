
export interface TUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'customer' | 'admin';
}
export type TLoginUser = {
  email: string;
  password: string;
};
export type TUserSign = {
  userId: string;
  email: string;
  role: string;
};
