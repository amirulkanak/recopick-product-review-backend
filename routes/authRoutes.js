import express from 'express';

import { login, logout } from '../controllers/authController.js';

const authRoutes = () => {
  const route = express.Router();

  // Post login Jwt - /auth/login
  route.post('/login', login);

  // Post logout Jwt- /auth/logout
  route.post('/logout', logout);

  return route;
};

export default authRoutes;
