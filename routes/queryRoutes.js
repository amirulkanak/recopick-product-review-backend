import express from 'express';
import {
  createOneQuery,
  getAllQuery,
  getAllQueryByUserEmail,
} from '../controllers/queryController.js';

const queryRoutes = () => {
  const route = express.Router();

  // GET all queries - /query/all
  route.get('/all', getAllQuery);
  // GET all queries by user email - /query/user/:userEmail
  route.get('/user/:userEmail', getAllQueryByUserEmail);
  // POST one query - /query/create
  route.post('/create', createOneQuery);

  return route;
};

export default queryRoutes;
