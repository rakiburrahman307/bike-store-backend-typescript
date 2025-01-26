import { TProduct } from './product.interface';
import Product from './product.model';
import Bike from './product.model';

// create a bike or insert bike data from database
const bikeInsertToDb = async (payload: TProduct) => {
  const { name, brand, price, model, stock } = payload;
  const result = await Bike.create({
    name,
    brand,
    model,
    price,
    stock,
  });
  return result;
};

// search  query by bike name, brand, category
const getAllBikes = async (searchTerm: string) => {
  if (searchTerm) {
    const result = await Product.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { brand: { $regex: searchTerm, $options: 'i' } },
        { model: { $regex: searchTerm, $options: 'i' } },
      ],
    }).sort({ createdAt: -1 });

    return result;
  }
};
// find bike by id
const findBikeById = async (id: string) => {
  const result = await Product.findById(id);
  if (!result) {
    throw new Error('Bike not found');
  }

  return result;
};
// update documentation
const updateDoc = async (id: string, updatedData: Partial<TProduct>) => {
  const result = await Product.findByIdAndUpdate(
    id,
    { $set: updatedData },
    { new: true, runValidators: true },
  );
  return result;
};
// delete documentation
const deleteDoc = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  return result;
};
export const BikeService = {
  bikeInsertToDb,
  getAllBikes,
  findBikeById,
  updateDoc,
  deleteDoc,
};
