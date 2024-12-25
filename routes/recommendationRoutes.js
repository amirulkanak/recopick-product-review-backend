import express from 'express';
import {
  getAllRecommendation,
  getAllRecommendationByQueryId,
  postRecommendation,
} from '../controllers/recommendationController.js';

const recommendationRoutes = () => {
  const route = express.Router();

  // GET all /recommendation/all
  route.get('/all', getAllRecommendation);

  // Get all Recommendation data by queryId
  route.get('/all/:queryId', getAllRecommendationByQueryId);

  // POST one /recommendation/create
  route.post('/create', postRecommendation);

  return route;
};

export default recommendationRoutes;
