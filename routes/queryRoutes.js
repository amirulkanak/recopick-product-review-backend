import express from 'express';
import { createOneQuery, getAllQuery } from '../controllers/queryController.js';

const queryRoutes = () => {
  const route = express.Router();

  route.get('/all', getAllQuery); // GET all queries - /query/all
  route.post('/create', createOneQuery); // POST one query - /query/create

  return route;
};

export default queryRoutes;
