import { ObjectId } from 'mongodb';
import connectDB from '../config/database.js';

const updateRecommendationCount = async (id, collectionName, action) => {
  const db = await connectDB();
  const collection = db.collection(collectionName);
  const incrementValue = action === 'increase' ? 1 : -1;
  await collection.updateOne(
    { _id: new ObjectId(id) },
    {
      $inc: {
        recommendationCount: incrementValue,
      },
    }
  );
};

export default updateRecommendationCount;
