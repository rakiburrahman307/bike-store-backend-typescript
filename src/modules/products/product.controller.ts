import { NextFunction, Request, Response } from 'express';
import { BikeService } from './product.service';

// create a new bike
const createBikesInfo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // get data from body
    const bikeData = req.body;
    // send the data to service function
    const result = await BikeService.bikeInsertToDb(bikeData);
    // Respond with success
    res.status(201).json({
      message: 'Bike created successfully',
      success: true,
      data: result,
    });
  } catch (error: any) {
    // Pass the error to the next middleware
    next(error);
  }
};
// get bikes by query: name, brand, category
const getAllBikesByQuery = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // get query from query parameter
    const { searchTerm } = req.query;

    const result = await BikeService.getAllBikes(searchTerm as string);

    // Respond with success
    res.status(200).json({
      message: 'Bikes retrieved successfully',
      success: true,
      data: result,
    });
  } catch (error: any) {
    // Pass the error to the next middleware
    next(error);
  }
};
// get a specific bike by using id
const getBikeById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // get productId from params
    const { productId } = req.params;
    // send request to service function
    const result = await BikeService.findBikeById(productId as string);

    // Respond with success
    res.status(200).json({
      message: 'Bike retrieved successfully',
      success: true,
      data: result,
    });
  } catch (error: any) {
    // Pass the error to the next middleware
    next(error);
  }
};
// updated doc
const docUpdatedById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const { productId } = req.params;
    const updatedData = req.body;
    const result = await BikeService.updateDoc(productId, updatedData);
    if (!result) {
      return res.status(404).json({
        message: 'Bike not found',
        success: false,
      });
    }
    // Respond with success
    res.status(200).json({
      message: 'Bike updated successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    // Pass the error to the next middleware
    next(error);
  }
};
const deleteBikeFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const { productId } = req.params;
    const result = await BikeService.deleteDoc(productId);
    if (!result) {
      return res.status(404).json({
        message: 'Bike not found',
        success: false,
      });
    }

    // Respond with success
    res.status(200).json({
      message: 'Bike deleted successfully',
      success: true,
      data: {},
    });
  } catch (error) {
    // Pass the error to the next middleware
    next(error);
  }
};
export const BikeControllers = {
  createBikesInfo,
  getAllBikesByQuery,
  getBikeById,
  docUpdatedById,
  deleteBikeFromDB,
};
