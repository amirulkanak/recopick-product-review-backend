import express from 'express';
import {
  getAllRecommendation,
  postRecommendation,
} from '../controllers/recommendationController.js';

const recommendationRoutes = () => {
  const route = express.Router();

  // GET all /recommendation/all
  route.get('/all', getAllRecommendation);

  // POST one /recommendation/create
  route.post('/create', postRecommendation);

  return route;
};

export default recommendationRoutes;
