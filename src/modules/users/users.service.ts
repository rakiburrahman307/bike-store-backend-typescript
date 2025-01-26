import { TUser } from './users.interface';
import User from './users.model';

const getUsers = async () => {
  // Fetch all users
  const users = await User.find();
  return users;
};
const updateUser = async (id: string, payload: Partial<TUser>) => {
  // Update users
  const users = await User.findByIdAndUpdate(
    id,
    {
      ...payload,
    },
    {
      new: true,
      runValidators: true,
    },
  );
  return users;
};
const deleteUser = async (id: string) => {
  // delete users
  const result = await User.findByIdAndDelete(id);
  return result;
};

export const userService = {
  getUsers,
  updateUser,
  deleteUser,
};
