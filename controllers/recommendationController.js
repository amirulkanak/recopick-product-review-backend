import { ObjectId } from 'mongodb';
import connectDB from '../config/database.js';
import updateRecommendationCount from '../utils/updateRecommendationCount.js';

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

// Get all Recommendation data userEmail
export const getAllRecommendationByUserEmail = async (req, res) => {
  try {
    const userEmail = req.params.userEmail;
    // Check if the user email in the token is the same as the requested user email
    if (req.user.email !== userEmail) {
      return res.status(403).send({ message: 'forbidden access' });
    }
    const db = await connectDB();
    const collection = db.collection(collectionName);
    const result = await collection
      .find({
        userEmail: userEmail,
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
    const userEmail = req.params.email;
    // Check if the user email in the token is the same as the requested user email
    if (req.user.email !== userEmail) {
      return res.status(403).send({ message: 'forbidden access' });
    }
    const db = await connectDB();
    const collection = db.collection(collectionName);
    const result = await collection
      .find({
        recommenderEmail: userEmail,
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
  await updateRecommendationCount(req.body.queryId, 'queries', 'increase');
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
    // find queryId to update queries collection recommendationCount
    const queryId = await collection.findOne({
      _id: new ObjectId(req.params.id),
    });
    // Update queries collection recommendationCount
    await updateRecommendationCount(queryId.queryId, 'queries', 'decrease');

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
