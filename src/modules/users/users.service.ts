import QueryBuilder from '../../builder/QueryBuilder';
import { TUser } from './users.interface';
import User from './users.model';

const getUsers = async (query: Record<string, unknown>) => {
  const queryBuilder = new QueryBuilder(User.find(), query);

  const users = await queryBuilder
    .search(['name', 'email', 'role'])
    .filter()
    .sort()
    .paginate()
    .fields()
    .modelQuery.exec();

  const meta = await queryBuilder.countTotal();

  return { users, meta };
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
