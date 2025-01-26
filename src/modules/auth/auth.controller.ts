import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import authService from './auth.service';

const registerUser = catchAsync(async (req, res) => {
  const result = await authService.register(req?.body);
  // register logic here
  sendResponse(res, {
    success: true,
    message: 'User registered successfully',
    statusCode: status.CREATED,
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  // send data to service function
  const result = await authService.login(req?.body);
  // response
  sendResponse(res, {
    success: true,
    message: 'Login successful',
    statusCode: status.OK,
    data: result,
  });
});

const authController = {
  registerUser,
  loginUser,
};

export default authController;
