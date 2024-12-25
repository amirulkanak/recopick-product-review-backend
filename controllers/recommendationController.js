import { ObjectId } from 'mongodb';
import connectDB from '../config/database.js';
import increaseRecommendationCount from '../utils/increaseRecommendationCount.js';

// Collection name
const collectionName = 'recommendations';

// Get all Recommendation data
export const getAllRecommendation = async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection(collectionName);
    const result = await collection.find({}).sort({ createdAt: -1 }).toArray();

    if (result.length === 0) {
      res.status(200).json({
        success: true,
        message: 'No Recommendation data found',
        result,
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Recommendation data retrieved successfully',
        result,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve Recommendation data',
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        details: error.message,
      },
    });
  }
};

// Get all Recommendation data by queryId
export const getAllRecommendationByQueryId = async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection(collectionName);
    const result = await collection
      .find({ queryId: req.params.queryId })
      .sort({ createdAt: -1 })
      .toArray();
    if (result.length === 0) {
      res.status(200).json({
        success: true,
        message: 'No Recommendation data found',
        result,
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Recommendation data retrieved successfully',
        result,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve Recommendation data',
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        details: error.message,
      },
    });
  }
};

// get all Recommendation data by recommenderEmail
export const getAllRecommendationByRecommenderEmail = async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection(collectionName);
    const result = await collection
      .find({
        recommenderEmail: req.params.email,
      })
      .sort({ createdAt: -1 })
      .toArray();
    if (result.length === 0) {
      res.status(200).json({
        success: true,
        message: 'No Recommendation data found',
        result,
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Recommendation data retrieved successfully',
        result,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve Recommendation data',
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        details: error.message,
      },
    });
  }
};

// Post a new Recommendation data
export const postRecommendation = async (req, res) => {
  // Update queries collection recommendationCount
  await increaseRecommendationCount(req.body.queryId, 'queries');
  try {
    const db = await connectDB();
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(req.body);

    res.status(201).json({
      success: true,
      message: 'Recommendation data posted successfully',
      result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to post Recommendation data',
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        details: error.message,
      },
    });
  }
};

// Delete a Recommendation data by id
export const deleteOneRecommendationById = async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection(collectionName);
    const result = await collection.deleteOne({
      _id: new ObjectId(req.params.id),
    });

    if (result.deletedCount === 0) {
      res.status(404).json({
        success: false,
        message: 'Recommendation data not found',
        result,
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Recommendation data deleted successfully',
        result,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete Recommendation data',
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        details: error.message,
      },
    });
  }
};
