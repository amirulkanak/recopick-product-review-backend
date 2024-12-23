import express from 'express';
import { getAllQuery } from '../controllers/queryController.js';

const queryRoutes = () => {
  const route = express.Router();

  route.get('/all', getAllQuery); // GET all queries - /query/all

  return route;
};

export default queryRoutes;
