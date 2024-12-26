import express from 'express';
import {
  createOneQuery,
  deleteOneQueryById,
  getAllQuery,
  getAllQueryByUserEmail,
  getOneQueryById,
  updateOneQueryById,
} from '../controllers/queryController.js';
import verifyJWTokenMiddleware from '../middleware/verifyJWTokenMiddleware.js';

const queryRoutes = () => {
  const route = express.Router();

  // GET all queries - /query/all
  route.get('/all', getAllQuery);
  // GET one query by ID - /query/:id
  route.get('/:id', getOneQueryById);
  // Update one query - /query/update/:id
  route.put('/update/:id', updateOneQueryById);
  // Delete one query - /query/delete/:id
  route.delete('/delete/:id', deleteOneQueryById);
  // GET all queries by user email via JWT verify - /query/user/:userEmail
  route.get(
    '/user/:userEmail',
    verifyJWTokenMiddleware,
    getAllQueryByUserEmail
  );
  // POST one query - /query/create
  route.post('/create', createOneQuery);

  return route;
};

export default queryRoutes;
