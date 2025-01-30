import { BikeService } from './product.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import status from 'http-status';

// create a new bike
const createBikesInfo = catchAsync(async (req, res) => {
  const result = await BikeService.bikeInsertToDb(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: 'Product created successfully',
    success: true,
    data: result,
  });
});
// get bikes by query: name, brand, category
const getAllBikesByQuery = catchAsync(async (req, res) => {
  const result = await BikeService.getAllBikes(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Products retrieved successfully',
    data: result.data,
    meta: result.meta,
  });
});
// get a specific bike by using id
const getBikeById = catchAsync(async (req, res) => {
  const { productId } = req.params;
  // send request to service function
  const result = await BikeService.findBikeById(productId as string);
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: 'Product retrieved successfully',
    data: result,
  });
});

// updated doc
const docUpdatedById = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const updatedData = req.body;
  const result = await BikeService.updateDoc(productId, updatedData);
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: 'Product updated successfully',
    data: result,
  });
});

// deleted doc
const deleteBikeFromDB = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await BikeService.deleteDoc(productId);
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: 'Product deleted successfully',
    data: result,
  });
});
export const BikeControllers = {
  createBikesInfo,
  getAllBikesByQuery,
  getBikeById,
  docUpdatedById,
  deleteBikeFromDB,
};
