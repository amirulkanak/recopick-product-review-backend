import { ObjectId } from 'mongodb';
import connectDB from '../config/database.js';

const decreaseRecommendationCount = async (id, collectionName) => {
  const db = await connectDB();
  const collection = db.collection(collectionName);
  await collection.updateOne(
    { _id: new ObjectId(id) },
    {
      $inc: {
        recommendationCount: -1,
      },
    }
  );
};

export default decreaseRecommendationCount;
