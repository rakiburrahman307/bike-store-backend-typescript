import mongoose from 'mongoose';
import { TBike } from './product.interface';
const { Schema } = mongoose;

const bikeSchema = new Schema<TBike>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      minlength: [2, 'Name must be at least 2 characters long'],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, 'Brand is required'],
      minlength: [2, 'Brand name must be at least 2 characters long'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be a positive number'],
    },
    category: {
      type: String,
      enum: {
        values: ['Mountain', 'Road', 'Hybrid', 'Electric'],
        message: 'Category must be one of: Mountain, Road, Hybrid, Electric',
      },
      required: [true, 'Category is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      default: '',
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity must be a positive number'],
    },
    inStock: {
      type: Boolean,
      required: [true, 'inStock is required'],
      default: false,
    },
  },
  { timestamps: true, versionKey: false },
);

const Bike = mongoose.model('bikes', bikeSchema);

export default Bike;
