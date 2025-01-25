import { TBike } from './product.interface';
import Bike from './product.model';

// create a bike or insert bike data from database
const bikeInsertToDb = async (bikeData: TBike) => {
  const { name, brand, price, category, description, quantity, inStock } =
    bikeData;
  const result = await Bike.create({
    name,
    brand,
    price,
    category,
    description,
    quantity,
    inStock,
  });
  return result;
};

// search  query by bike name, brand, category
const getAllBikes = async (searchTerm: string) => {
  if (searchTerm) {
    const result = await Bike.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { brand: { $regex: searchTerm, $options: 'i' } },
        { category: { $regex: searchTerm, $options: 'i' } },
      ],
    }).sort({ createdAt: -1 });

    return result;
  }
};
// find bike by id
const findBikeById = async (id: string) => {
  const result = await Bike.findById(id);
  if (!result) {
    throw new Error('Bike not found');
  }

  return result;
};
// update documentation
const updateDoc = async (id: string, updatedData: Partial<TBike>) => {
  const result = await Bike.findByIdAndUpdate(
    id,
    { $set: updatedData },
    { new: true, runValidators: true },
  );
  return result;
};
// delete documentation
const deleteDoc = async (id: string) => {
  const result = await Bike.findByIdAndDelete(id);
  return result;
};
export const BikeService = {
  bikeInsertToDb,
  getAllBikes,
  findBikeById,
  updateDoc,
  deleteDoc,
};
