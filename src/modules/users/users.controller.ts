import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userService } from './users.service';

const getAllUsers = catchAsync(async (req, res) => {
  const result = await userService.getUsers();
  sendResponse(res, {
    statusCode: status.OK,
    message: 'Users retrieved successfully',
    success: true,
    data: result,
  });
});
const updateUserData = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await userService.updateUser(id, req?.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: 'User update successfully',
    success: true,
    data: result,
  });
});
const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  await userService.deleteUser(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: 'User deleted successfully',
    success: true,
    data: {},
  });
});

export const userControllers = {
  getAllUsers,
  updateUserData,
  deleteUser,
};
