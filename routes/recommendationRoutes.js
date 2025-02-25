import express from 'express';
import {
  deleteOneRecommendationById,
  getAllRecommendation,
  getAllRecommendationByQueryId,
  getAllRecommendationByRecommenderEmail,
  getAllRecommendationByUserEmail,
  postRecommendation,
} from '../controllers/recommendationController.js';
import verifyJWTokenMiddleware from '../middleware/verifyJWTokenMiddleware.js';

const recommendationRoutes = () => {
  const route = express.Router();

  // GET all /recommendation/all
  route.get('/all', getAllRecommendation);

  // GET all /recommendation/all/:userEmail
  route.get(
    '/forMe/:userEmail',
    verifyJWTokenMiddleware,
    getAllRecommendationByUserEmail
  );

  // Get all Recommendation data by queryId
  route.get('/comments/:queryId', getAllRecommendationByQueryId);

  // Get all Recommendation data by recommenderEmail
  route.get(
    '/myRecommendations/:email',
    verifyJWTokenMiddleware,
    getAllRecommendationByRecommenderEmail
  );

  // POST one /recommendation/create
  route.post('/create', postRecommendation);

  // DELETE one /recommendation/delete/:id
  route.delete('/delete/:id', deleteOneRecommendationById);

  return route;
};

export default recommendationRoutes;
