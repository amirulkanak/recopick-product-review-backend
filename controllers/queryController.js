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

// Get one Query data by ID
export const getOneQueryById = async (req, res) => {
  try {
    const { id } = req.params;
    const db = await connectDB();
    const collection = db.collection(collectionName);
    const result = await collection.findOne({ _id: new ObjectId(id) });

    if (result) {
      res.status(200).json({
        success: true,
        message: 'Query data retrieved successfully',
        result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Query data not found',
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

// Update one Query data by ID
export const updateOneQueryById = async (req, res) => {
  try {
    const { id } = req.params;
    const queryObject = req.body;
    const db = await connectDB();
    const collection = db.collection(collectionName);
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: queryObject }
    );

    if (result.matchedCount === 0) {
      res.status(404).json({
        success: false,
        message: 'Query data not found',
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Query data updated successfully',
        result,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update Query data',
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        details: error.message,
      },
    });
  }
};

// Delete one Query data by ID
export const deleteOneQueryById = async (req, res) => {
  try {
    const { id } = req.params;
    const db = await connectDB();
    const collection = db.collection(collectionName);
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      res.status(404).json({
        success: false,
        message: 'Query data not found',
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Query data deleted successfully',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete Query data',
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
