import { ObjectId } from 'mongodb';
import connectDB from '../config/database.js';

// Collection name
const collectionName = 'queries';

// Get all Query data
export const getAllQuery = async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection(collectionName);
    const result = await collection.find({}).toArray();

    if (result.length === 0) {
      res.status(200).json({
        success: true,
        message: 'No Query data found',
        result,
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Query data retrieved successfully',
        result,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve Query data',
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        details: error.message,
      },
    });
  }
};

// Create one equipment
export const createOneQuery = async (req, res) => {
  try {
    const queryObject = req.body;
    const db = await connectDB();
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(queryObject);

    res.status(201).json({
      success: true,
      message: 'Query data created successfully',
      result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create Query data',
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        details: error.message,
      },
    });
  }
};

// Get All Query data by user email
export const getAllQueryByUserEmail = async (req, res) => {
  try {
    const { userEmail } = req.params;
    const db = await connectDB();
    const collection = db.collection(collectionName);
    const result = await collection
      .find({ 'user.email': userEmail })
      .sort({ createdAt: -1 })
      .toArray();

    if (result.length === 0) {
      res.status(200).json({
        success: true,
        message: 'No Query data found',
        result,
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Query data retrieved successfully',
        result,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve Query data',
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        details: error.message,
      },
    });
  }
};
