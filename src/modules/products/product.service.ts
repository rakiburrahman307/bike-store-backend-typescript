import QueryBuilder from '../../builder/QueryBuilder';
import { ProductSearchableFields } from './product.constant';
import { TProduct } from './product.interface';
import Product from './product.model';
import Bike from './product.model';

// create a bike or insert bike data from database
const bikeInsertToDb = async (payload: TProduct) => {
  const result = await Bike.create({
    ...payload,
  });
  return result;
};

// search  query by bike name, brand, category
const getAllBikes = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(
    Product.find().populate('userId'),
    query,
  )
    .search(ProductSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const data = await productQuery.modelQuery.exec();
  const meta = await productQuery.countTotal();

  return {
    data,
    meta,
  };
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
    { ...updatedData },
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
