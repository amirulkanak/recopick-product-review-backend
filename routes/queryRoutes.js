import express from 'express';
import {
  createOneQuery,
  deleteOneQueryById,
  getAllQuery,
  getAllQueryByUserEmail,
  updateOneQueryById,
} from '../controllers/queryController.js';

const queryRoutes = () => {
  const route = express.Router();

  // GET all queries - /query/all
  route.get('/all', getAllQuery);
  // Update one query - /query/update/:id
  route.put('/update/:id', updateOneQueryById);
  // Delete one query - /query/delete/:id
  route.delete('/delete/:id', deleteOneQueryById);
  // GET all queries by user email - /query/user/:userEmail
  route.get('/user/:userEmail', getAllQueryByUserEmail);
  // POST one query - /query/create
  route.post('/create', createOneQuery);

  return route;
};

export default queryRoutes;
